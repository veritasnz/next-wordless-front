import { useContext, useRef, useState } from "react";

import useInput from "hooks/useInput";
import {
    validateEmail,
    validateMessage,
    validateName,
} from "lib/input-validation";
import { SiteContext } from "store/site-context";

import TextField from "./TextField";
import TextareaField from "./TextareaField";
import Honeypot from "./Honeypot";

const postStatusFeedbackMessages = {
    SENDING: "Sending enquiry...",
    SENT: "Enquiry sent! \n Please check your emails for an email of receipt",
    ERROR: "An error occured. Please try again in a few minutes",
};

export default function ContactForm() {
    const honeypotInputRef = useRef();
    const { siteSettings } = useContext(SiteContext);
    const [postStatusFeedback, setPostStatusFeedback] = useState(false);

    const name = useInput(validateName);
    const email = useInput(validateEmail);
    const message = useInput(validateMessage);

    let formIsValid = false;
    if (name.isValid && email.isValid && message.isValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        if (!formIsValid) return;

        // Honeypot check – form invalid if has value
        if (honeypotInputRef.current.value.trim() !== "") return;

        setPostStatusFeedback("SENDING");

        const response = await fetch("/api/contact-enquiry", {
            method: "POST",
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value,
                siteName: siteSettings.siteTitle,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setPostStatusFeedback("SENT");
                    return res.json();
                } else {
                    throw new Error(`${res.status}: ${res.statusText}`);
                }
            })
            .catch((error) => {
                setPostStatusFeedback("ERROR");
                return { message: `${error.name}: ${error.message}` }; // Spoof response
            });

        console.log(response?.message);

        name.reset();
        email.reset();
        message.reset();
    };

    return (
        <form className="c-form" onSubmit={formSubmissionHandler}>
            <Honeypot ref={honeypotInputRef} />
            <TextField
                id="name"
                labelText="Name"
                errorText="Names must be longer than two characters"
                required={true}
                maxLength="64"
                {...name}
            />
            <TextField
                id="email"
                labelText="Email"
                errorText="Please enter a valid email address"
                required={true}
                maxLength="320"
                {...email}
            />
            <TextareaField
                id="message"
                labelText="Message"
                errorText="Messages must not be longer than 10 characters"
                rows="5"
                {...message}
            />
            <div className="c-form__actions">
                <button
                    className="o-bttn"
                    type="submit"
                    disabled={!formIsValid}
                >
                    Submit
                </button>
            </div>
            {postStatusFeedback && (
                <div
                    className={`c-form__status c-form__status--${postStatusFeedback.toLowerCase()}`}
                >
                    {postStatusFeedbackMessages[postStatusFeedback]}
                </div>
            )}
        </form>
    );
}

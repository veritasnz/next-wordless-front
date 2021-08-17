import { useEffect, forwardRef } from "react";

let honeypotTimeout;

const TIME_UNTIL_DEACTIVATION = 3000; // Time until honeypot deactivates itself (ms)

/**
 * A simple honeypot label + input.
 * After a few seconds the honeypot deactivates the "required" property on the <input>.
 * Input is passed as a ref to the parent form
 * Descriptive label text for screen-readers, but excludes keywords bots might search for
 */
const Honeypot = (props, ref) => {
    useEffect(() => {
        honeypotTimeout = setTimeout(() => {
            ref.current.required = false;
            ref.current.ariaRequired = false;
        }, TIME_UNTIL_DEACTIVATION);

        return () => clearTimeout(honeypotTimeout);
    }, [ref]);

    return (
        <div className="c-form__hachimitsu">
            <label htmlFor="address">
                This is not a real form field. Skip to the next field please
            </label>
            <input ref={ref} type="text" id="address" aria-required required />
        </div>
    );
};

export default forwardRef(Honeypot);

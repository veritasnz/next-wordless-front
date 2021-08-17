const Parse = require("parse/node");

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

export default async function backupEmail(message) {
    const Email = Parse.Object.extend("Email");
    const email = new Email();

    email.set("Name", message.name);
    email.set("Email", message.email);
    email.set("Message", message.message);

    try {
        await email.save();
        console.log("Email backup succeeded");
    } catch (error) {
        console.log("Email backup failed");
    }
}

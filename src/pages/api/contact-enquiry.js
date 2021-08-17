import rateLimiter from "lib/rate-limit";
import backupEmail from "lib/backupEmail";
import { sendAdminReceiptEmail, sendUserReceiptEmail } from "lib/email";

const MAX_REQUESTS_PER_MIN = 3;
const usesParse =
    process.env.PARSE_APP_ID &&
    process.env.PARSE_JS_KEY &&
    process.env.PARSE_SERVER_URL;

export default async function handler(req, res) {
    // Fallback response
    let response = {
        code: 400,
        message: "Malformed request",
    };

    if (req.method === "POST") {
        // Limit rate of requests to 3 per minute
        try {
            await rateLimiter.check(res, MAX_REQUESTS_PER_MIN, "CACHE_TOKEN");
        } catch {
            res.status(429).json({ error: "Rate limit exceeded" });
            return;
        }

        // Back up emails incase of failed delivery
        if (usesParse) await backupEmail(req.body);

        // Send emails
        try {
            const userReceiptId = await sendUserReceiptEmail(req.body);
            const adminReceiptId = await sendAdminReceiptEmail(req.body);

            response = {
                code: 200,
                message: `User Receipt ID: ${userReceiptId}, Admin Receipt ID: ${adminReceiptId}`,
            };
        } catch (error) {
            response = {
                code: 500,
                message: `${error.name}: ${error.message}`,
            };
        }
    }

    res.status(response.code).json({ message: response.message });
}

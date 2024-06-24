import nodemailer from "nodemailer";
import 'dotenv/config'

export async function sendMail({ to, subject, text, html }) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            to,
            subject,
            text,
            html,
            from: "Enviador de email <noreply@thereal.mail>"
        })
    } catch (error) {
        throw error
    }
}

export const emailBody = (title, text) => {
    return {
        html: `
        <div style="text-align: center;">
            <h2>${title}</h2>
            <p>${text}</p>
        </div>
    `,
        text: `${title}\n\n${text}`,
    }
}
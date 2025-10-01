import type { APIRoute } from "astro";
import sgMail from "@sendgrid/mail";

// Inserisci la tua chiave SendGrid (usa .env per sicurezza)
sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const { name, email, message } = body;

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields." }),
                { status: 400 }
            );
        }

        const msg = {
            to: "tuo@email.it", // destinatario
            from: "noreply@nls.studio", // mittente verificato su SendGrid
            subject: `Nuovo messaggio da ${name}`,
            replyTo: email,
            text: message,
            html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong><br/>${message}</p>
      `,
        };

        await sgMail.send(msg);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Errore invio email:", error);
        return new Response(JSON.stringify({ error: "Errore invio email" }), {
            status: 500,
        });
    }
};

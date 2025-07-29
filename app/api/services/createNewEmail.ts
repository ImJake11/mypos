import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function resendSendEmail({
    email = "",
    fullname,
    subject,
    template,
}: {
    email?: string,
    fullname?: string,
    subject: string,
    template: React.JSX.Element,
}) {

    const { data, error } = await resend.emails.send({
        from: 'Nexustock <noreply@jakejug.site>',
        to: [email],
        subject,
        react: template
    });

    if (error) {
        console.log(error)
        throw new Error("Resend api error");
    }

    return data;

}
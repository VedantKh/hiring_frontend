import { Resend } from "resend";
import { EmailTemplate, EmailTemplateProps } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const emailData: EmailTemplateProps = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Algoro <contact@algoro.ai>",
      to: ["vedant@algoro.ai", "abdulla@algoro.ai", "contact@algoro.ai"],
      subject: "Introduction Request – Algoro",
      react: EmailTemplate(emailData),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

// /app/api/order/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplateCustomer } from "~/components/email-customer";
import { EmailTemplateEstablishment } from "~/components/email-establishment";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract order details from the request body
    const {
      customerEmail,
      customerName,
      customerPhone,
      orderDetails,
      language,
    } = body;

    // Log all of the data
    console.log("Customer Name:", customerName);
    console.log("Customer Email:", customerEmail);
    console.log("Customer Phone:", customerPhone);

    // Prepare email content based on language
    const subjectCustomer =
      language === "en"
        ? "Your Order Confirmation"
        : "Confirmación de tu Pedido";
    const subjectEstablishment =
      language === "en" ? "New Order Received" : "Nuevo Pedido Recibido";

    // Send email to customer
    await resend.emails.send({
      from: "no-reply@dvidal.dev", // Replace with your verified sender
      to: customerEmail,
      subject: subjectCustomer,
      react: EmailTemplateCustomer({ customerName, orderDetails, language }),
    });

    // Send email to establishment
    await resend.emails.send({
      from: "no-reply@dvidal.dev", // Replace with your verified sender
      to: "dylanvidal1205@gmail.com",
      subject: subjectEstablishment,
      react: EmailTemplateEstablishment({
        customerName,
        customerEmail,
        customerPhone,
        orderDetails,
        language,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails." },
      { status: 500 },
    );
  }
}

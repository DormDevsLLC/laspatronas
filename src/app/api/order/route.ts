// /app/api/order/route.ts

import dotenv from "dotenv";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplateCustomer } from "~/components/email-customer";
import { EmailTemplateEstablishment } from "~/components/email-establishment";
dotenv.config();
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

    // Prepare email content based on language
    const subjectCustomer = `${
      language === "en"
        ? "Your Order Confirmation"
        : "Confirmación de tu Pedido"
    } - Las Patronas UCF`;
    const subjectEstablishment = `$${orderDetails.total} Order | Pickup ${orderDetails.pickupTime == "ASAP" ? "ASAP" : formatTime(orderDetails.pickupTime)} | ${orderDetails.specialRequests && "SPECIAL REQUESTS | "} ${customerName}`;

    // Send email to customer
    await resend.emails.send({
      from: "orders@laspatronasucf.com", // Replace with your verified sender
      to: customerEmail,
      subject: subjectCustomer,
      react: EmailTemplateCustomer({ customerName, orderDetails, language }),
    });

    // Send email to establishment
    await resend.emails.send({
      from: "orders@laspatronasucf.com", // Replace with your verified sender
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

// Helper function to format time from 24-hour to 12-hour format
function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours! >= 12 ? "PM" : "AM";
  const formattedHours = hours! % 12 || 12;
  return `${formattedHours}:${minutes!.toString().padStart(2, "0")} ${period}`;
}

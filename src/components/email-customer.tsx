// /emails/EmailTemplateCustomer.tsx

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateCustomerProps {
  customerName: string;
  orderDetails: any;
  language: string;
}

export const EmailTemplateCustomer: React.FC<
  Readonly<EmailTemplateCustomerProps>
> = ({ customerName, orderDetails, language }) => {
  const {
    items,
    subtotal,
    salesTax,
    total,
    pickupTimeOption,
    pickupTime,
    specialRequests,
  } = orderDetails;

  const formattedItems = items.map((item: any, index: number) => (
    <Section key={index}>
      <Text>
        {item.quantity} x {item.name} - ${item.total}
      </Text>
    </Section>
  ));

  const pickupInfo =
    pickupTimeOption === "ASAP"
      ? language === "en"
        ? "Pickup Time: ASAP"
        : "Hora de Recogida: Lo Antes Posible"
      : language === "en"
        ? `Pickup Time: ${formatTime(pickupTime)}`
        : `Hora de Recogida: ${formatTime(pickupTime)}`;

  const specialRequestsText =
    specialRequests && specialRequests.trim() !== ""
      ? language === "en"
        ? `Special Requests:\n${specialRequests}`
        : `Peticiones Especiales:\n${specialRequests}`
      : "";

  function formatTime(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours! >= 12 ? "PM" : "AM";
    const formattedHours = hours! % 12 || 12;
    return `${formattedHours}:${minutes!.toString().padStart(2, "0")} ${period}`;
  }

  return (
    <Html>
      <Head />
      <Preview>
        {language === "en"
          ? "Your Order Confirmation"
          : "Confirmación de tu Pedido"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {language === "en"
              ? `Hello ${customerName},`
              : `Hola ${customerName},`}
          </Heading>
          <Text style={text}>
            {language === "en"
              ? "Thank you for your order! Your order details are as follows:"
              : "¡Gracias por tu pedido! Los detalles de tu pedido son los siguientes:"}
          </Text>
          <Hr />
          {formattedItems}
          <Hr />
          <Section>
            <Text style={text}>
              {language === "en" ? "Subtotal:" : "Subtotal:"} ${subtotal}
            </Text>
            <Text style={text}>
              {language === "en" ? "Sales Tax:" : "Impuesto:"} ${salesTax}
            </Text>
            <Text style={text}>
              {language === "en" ? "Total:" : "Total:"} ${total}
            </Text>
          </Section>
          <Hr />
          <Section>
            <Text style={text}>{pickupInfo}</Text>
            {specialRequestsText && (
              <Text style={text}>{specialRequestsText}</Text>
            )}
          </Section>
          <Hr />
          <Text style={text}>
            {language === "en"
              ? "We appreciate your business!"
              : "¡Apreciamos tu preferencia!"}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333333",
  fontSize: "24px",
  fontWeight: "bold",
};

const text = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.5",
};

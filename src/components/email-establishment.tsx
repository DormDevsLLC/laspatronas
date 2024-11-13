// /emails/EmailTemplateEstablishment.tsx

import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface EmailTemplateEstablishmentProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDetails: any;
  language: string;
}

export const EmailTemplateEstablishment: React.FC<
  Readonly<EmailTemplateEstablishmentProps>
> = ({
  customerName,
  customerEmail,
  customerPhone,
  orderDetails,
  language,
}) => {
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
        {language === "en" ? "New Order Received" : "Nuevo Pedido Recibido"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {language === "en"
              ? `New order from ${customerName}`
              : `Nuevo pedido de ${customerName}`}
          </Heading>
          <Text style={text}>
            {language === "en"
              ? "Order details are as follows:"
              : "Los detalles del pedido son los siguientes:"}
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
            {language === "en" ? "Customer Info:" : "Información del Cliente:"}
          </Text>
          <Text style={text}>
            {language === "en" ? "Email:" : "Correo Electrónico:"}{" "}
            {customerEmail}
          </Text>
          <Text style={text}>
            {language === "en" ? "Phone:" : "Teléfono:"} {customerPhone}
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

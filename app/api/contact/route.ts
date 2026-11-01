import { Resend } from "resend";
import type { NextRequest } from "next/server";

// ===== Data model (SPEC 03) =====
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  // Campo alternativo que usa el cliente/cl template ("msg")
  msg?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
  error?: string;
};

// ===== Route handler =====
export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        success: false,
        message: "Configuración del servidor incompleta.",
        error: "RESEND_API_KEY no está definida.",
      } satisfies ContactResponse,
      { status: 500 },
    );
  }

  let body: ContactFormData;
  try {
    body = (await request.json()) as ContactFormData;
  } catch {
    return Response.json(
      {
        success: false,
        message: "Cuerpo de solicitud inválido.",
        error: "El JSON del cuerpo no es válido.",
      } satisfies ContactResponse,
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  // El cliente envía "msg" (según el template); mapeamos al campo interno "message"
  const message = String(body.message ?? body.msg ?? "").trim();

  if (!name || !email || !message) {
    return Response.json(
      {
        success: false,
        message: "Faltan campos requeridos.",
        error: "Nombre, correo electrónico y mensaje son obligatorios.",
      } satisfies ContactResponse,
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.RESEND_TO_EMAIL ?? "fcomorales.sanchez@gmail.com";
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Arcade Vault <noreply@arcadevault.gg>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto — ARCADE VAULT</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo electrónico:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
      text: `Nuevo mensaje de contacto — ARCADE VAULT\n\nNombre: ${name}\nCorreo electrónico: ${email}\n\nMensagem:\n${message}`,
    });

    if (error) {
      return Response.json(
        {
          success: false,
          message: "Error al enviar el correo.",
          error: error.message,
        } satisfies ContactResponse,
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Correo enviado correctamente.",
      } satisfies ContactResponse,
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "Error inesperado al enviar el correo.",
        error: err instanceof Error ? err.message : String(err),
      } satisfies ContactResponse,
      { status: 500 },
    );
  }
}
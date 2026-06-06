type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  inquiry?: unknown;
};

const recipientEmail = "amasinjaka@gmail.com";

function sanitize(value: string) {
  return value.trim().replace(/[<>]/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Portfolio";

  if (!apiKey || !senderEmail) {
    return Response.json(
      { message: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? sanitize(body.name) : "";
  const email = typeof body.email === "string" ? sanitize(body.email) : "";
  const inquiry =
    typeof body.inquiry === "string" ? sanitize(body.inquiry) : "";

  if (!name || !email || !inquiry) {
    return Response.json(
      { message: "Please complete all fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: recipientEmail,
          name: "Masinjaka Andrianomentsoa",
        },
      ],
      replyTo: {
        email,
        name,
      },
      subject: `Portfolio message from ${name}`,
      textContent: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        inquiry,
      ].join("\n"),
      htmlContent: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.replace(/\n/g, "<br />")}</p>
      `,
    }),
  });

  if (!brevoResponse.ok) {
    return Response.json(
      { message: "Could not send your message. Please try again later." },
      { status: 502 }
    );
  }

  return Response.json({ message: "Message sent." });
}

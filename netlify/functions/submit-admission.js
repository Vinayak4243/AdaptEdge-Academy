export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    let payload = {};

    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      payload = {};
    }

    const { name, email, phone, course, mode, query } = payload;

    if (!name || !email || !phone || !course) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const mailTo = process.env.MAIL_TO || "adaptedgeacademy@gmail.com";
    const mailFrom = process.env.MAIL_FROM || "AdaptEdge Academy <onboarding@resend.dev>";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return {
        statusCode: 503,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Email delivery is not configured. Add RESEND_API_KEY, MAIL_TO, and MAIL_FROM in Netlify environment variables.",
        }),
      };
    }

    const emailBody = [
      "New AdaptEdge Academy Enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Course: ${course}`,
      `Mode: ${mode || "Not specified"}`,
      `Query: ${query || "No additional details"}`,
      `Source: ${payload.source || "Website"}`,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        reply_to: email,
        subject: `New admission enquiry from ${name}`,
        text: emailBody,
        html: `<h2>New AdaptEdge Academy Enquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Course:</strong> ${course}</p><p><strong>Mode:</strong> ${mode || "Not specified"}</p><p><strong>Query:</strong> ${query || "No additional details"}</p><p><strong>Source:</strong> ${payload.source || "Website"}</p>`,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: "Email provider rejected the request.",
          details: resendError,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ok: true,
        message: "Admission enquiry received.",
        payload: {
          name,
          email,
          phone,
          course,
          mode,
          query,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Server error while processing enquiry" }),
    };
  }
}

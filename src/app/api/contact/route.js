import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "All fields are required!" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "usmangill2655@gmail.com",      
        pass: "hfob bktc ugoj qejt",
      },
    });

    const mailOptions = {
      from: email,
      to: "usmangill2655@gmail.com",          
      subject: `New Email from ${name}`,
      html: `
        <h2>📩 New Email </h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Email sending failed!" },
      { status: 500 }
    );
  }
}

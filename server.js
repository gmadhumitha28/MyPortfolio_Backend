import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "gmadhumitha.official@gmail.com",  // replace with your email
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully:", data);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Portfolio backend is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

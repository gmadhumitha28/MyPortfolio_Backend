const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 Message received:", name, email, message);

  // ✅ Step 1: Create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
},
  });

  // ✅ Step 2: Compose email
  let mailOptions = {
    from: email,
    to: "gmadhumitha.official@gmail.com", // <-- your own address to receive messages
    subject: "New Message from Portfolio Contact Form",
    html: `
  <h3>New Contact Form Message</h3>
  <p><b>Name:</b> ${name}</p>
  <p><b>Email:</b> ${email}</p>
  <p><b>Message:</b> ${message}</p>
`
,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


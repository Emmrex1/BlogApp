const nodemailer = require('nodemailer');

const sendContactEmail = async (req, res) => {
  const { name, email,subject, message} = req.body;

  if (!name || !email || !message || !subject) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email failed to send." });
  }
}
module.exports = { sendContactEmail };

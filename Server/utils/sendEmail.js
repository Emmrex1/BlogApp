import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: `"Emmrex Blog App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset.</p>
           <p>Click here to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

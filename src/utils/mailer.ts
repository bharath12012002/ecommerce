import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (email: string, orderId: string, total: number) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Confirmation',
    text: `Thank you for your order. Your order ID is ${orderId}. Total Amount: $${total}`,
    html: `<p>Thank you for your order. Your order ID is <strong>${orderId}</strong>.</p><p>Total Amount: <strong>$${total}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

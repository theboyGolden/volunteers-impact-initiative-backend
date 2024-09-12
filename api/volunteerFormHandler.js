const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'da7.host-ww.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, phoneNumber, email, occupation, country, interest, additionalInfo } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Volunteer Application from ${name}`,
    text: `
      Name: ${name}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Occupation: ${occupation}
      Country of Residence: ${country}
      Area of Interest: ${interest}
      Additional Information: ${additionalInfo}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Volunteer application email sent successfully');
    res.status(200).send('Volunteer form submitted successfully!');
  } catch (error) {
    console.error('Error sending volunteer application email:', error);
    res.status(500).send('Error submitting form.');
  }
};

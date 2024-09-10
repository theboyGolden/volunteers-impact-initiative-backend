const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  host: 'da7.host-ww.net', // Use your preferred email service host
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER, // email address from .env file
    pass: process.env.EMAIL_PASS, // email password from .env file
  },
});

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: `Contact Form Submission from ${name}`,
    text: `New contact form message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
  });
});

// Route to handle volunteer form submissions
app.post('/volunteer', (req, res) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending volunteer application email:', error);
      return res.status(500).send('Error submitting form.');
    }
    console.log('Volunteer application email sent: ' + info.response);
    res.send('Volunteer form submitted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

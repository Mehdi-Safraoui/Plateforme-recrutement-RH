const express = require('express');
const router = express.Router();
const sendEmail = require('../nodemailer');

router.post('/send-email', async (req, res) => {
  const { to, subject, html } = req.body;
  try {
    await sendEmail(to, subject, html);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;

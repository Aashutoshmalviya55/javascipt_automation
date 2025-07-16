// server.js
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const fromNumber = process.env.TWILIO_PHONE;

const client = new twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;
  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: to
    });
    res.json({ status: "SMS sent successfully!" });
  } catch (error) {
    res.json({ status: "Failed to send SMS", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

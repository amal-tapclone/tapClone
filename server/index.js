const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const logger = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  form
const config = {
  service: "gmail",
  host: "smpt.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: process.env.serviceEmail,
    pass: process.env.serviceEmailPW,
  },
};

function send(data) {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err.message);
      throw new Error(err.message);
    } else {
      console.log(info.response);
      return info.response;
    }
  });
}
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authortization"
  );
  res.setHeader("Acces-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
});

app.use(cors());
app.post("/api/contact-form", async (req, res) => {
  console.log("kdfk");
  let { name, email, message } = req.body;

  const output = `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <h2 style="color: #333;">You have a new Appointment request</h2>
            <p style="font-size: 16px;">Name: ${name}</p>
            <p style="font-size: 16px;">Email: ${email}</p>
            <p style="font-size: 16px;">Message: ${message}</p>
          </div>`;

  const data = {
    from: "mailserviceSensRe@gmail.com",
    to: "amalc.plr@gmail.com",
    subject: "TapClone GetIn Request",  
    html: output,
  };

  send(data);
  res.status(200).send({ success: true });
});
app.use(logger("dev"));
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

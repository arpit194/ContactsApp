const Contact = require("../models/contactModel");
const Message = require("../models/messageModel");

require("dotenv").config();

const sid = process.env.SID;
const token = process.env.TOKEN;

const client = require("twilio")(sid, token);

module.exports.addContact = async (req, res, next) => {
  try {
    const { firstName, lastName, number } = req.body;

    try {
      const contact = await Contact.create({
        firstName,
        lastName,
        number,
        owner: req.userId,
      });

      contact._id = undefined;

      return res.json({ status: true, contact: contact });
    } catch (err) {
      console.log(err);
      return res.json({ status: false, message: "Failed to add new contact" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.deleteOne({ _id: req.body.id });
    return res.json({ status: true, message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.userId });
    return res.json({ status: true, contacts: contacts });
  } catch (err) {
    next(err);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      owner: req.userId,
      to: req.body.toId,
    });
    return res.json({ status: true, messages: messages });
  } catch (err) {
    next(err);
  }
};

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { message, sender, otp, number, toId } = req.body;
    const from = "+15627845684";
    const to = "+917374873022";
    const text = message + " -" + sender;

    let newMessage;
    try {
      const result = client.messages
        .create({
          body: text,
          from: from,
          to: to,
        })
        .then(async (msg) => {
          newMessage = await Message.create({
            from,
            to: toId,
            toName: sender,
            owner: req.userId,
            otp,
            date: new Date().toLocaleString(),
          });
          res.json({
            status: true,
            message: "OTP sent successfully",
            newMessage,
          });
        });
    } catch (err) {
      res.json({ status: false, message: "Could not send SMS", newMessage });
    }
  } catch (err) {
    next(err);
  }
};

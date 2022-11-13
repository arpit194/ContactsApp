const express = require("express");

const contactsControllers = require("../controllers/contactsController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/getContacts", contactsControllers.getContacts);
router.post("/addContact", contactsControllers.addContact);
router.post("/deleteContact", contactsControllers.deleteContact);
router.post("/sendMessage", contactsControllers.sendMessage);
router.post("/getMessages", contactsControllers.getMessages);

module.exports = router;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const contactsRoutes = require("./routes/contactsRoutes");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://arpit194.github.io"],
  })
);

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/contacts", contactsRoutes);

app.use((req, res, next) => {
  return { message: "Not Found" };
});

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});

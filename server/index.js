const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTED_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", (request, responce) => {
  responce.json({
    message: `Server is running on port ${PORT}`,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

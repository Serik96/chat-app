const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTED_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, responce) => {
  responce.json({
    message: `Server is running on port ${PORT}`,
  });
});

//api endpoint
app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`DB Server is running on port ${PORT}`);
  });
});

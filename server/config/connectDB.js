const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => console.log("Connect to MongoDB", error));

    connection.on("error", (error) =>
      console.log("Error connection MongoDB", error)
    );
  } catch (error) {
    console.log("Error connecting", error);
  }
}

module.exports = connectDB;

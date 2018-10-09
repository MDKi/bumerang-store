const mongoose = require("mongoose");
const config = require("../../config");

// config.url is giving me undefined idk why
const url = config.url || "mongodb://localhost:27017/bumerang-store-test";

const dropDB = async () => {
  await mongoose.connection.db.dropDatabase();
}
const connectDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  await dropDB();
}
const disconnectDB = async () => {
  await dropDB();
  await mongoose.disconnect();
}

module.exports = {
  connectDB,
  disconnectDB
}

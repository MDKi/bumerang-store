import mongoose from "mongoose";
import config from "../../config";

const url: string = config.db;

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

export {
  connectDB,
  disconnectDB,
}

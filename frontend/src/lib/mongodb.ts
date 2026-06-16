import mongoose from "mongoose";

const MONGODB_URI = "mongodb://root:example@mongo:27017/diario";


export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}
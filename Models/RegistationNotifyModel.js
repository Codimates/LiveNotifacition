import mongoose from "mongoose";

const { Schema } = mongoose;

const RegistationNotifySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: () => new Date(),
      required: true,
    },
    viewed: {
      type: [String], 
      default: [], 
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString(),
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RegistationNotify", RegistationNotifySchema);

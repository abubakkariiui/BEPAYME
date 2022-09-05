import mongoose from "mongoose";

const historySchema = mongoose.Schema(
  {
    receiverName: {
      type: String,
    },
    senderName: {
      type: String,
    },
    amount: {
      type: Number,
    },
    receiverNumber: {
      type: Number,
    },
    senderNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("history", historySchema);

export default History;

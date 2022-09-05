import mongoose from "mongoose";
const requestSchema = mongoose.Schema({
  name: {
    type: String,
  },
  usernumber: {
    type: String,
  },
  amount: {
    type: Number,
  },
  agentNumber: {
    type: String,
  },
});

const Pay = mongoose.model("payRequest", requestSchema);

export default Pay;

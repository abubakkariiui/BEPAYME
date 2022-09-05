import mongoose from "mongoose";

const bankSchema = mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: Number,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Bank = mongoose.model("bank", bankSchema);

export default Bank;

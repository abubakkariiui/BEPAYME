import mongoose from "mongoose";

const csrSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  query: {
    type: String,
  },
  description: {
    type: String,
  },
});

const CSR = mongoose.model("CSR", csrSchema);

export default CSR;

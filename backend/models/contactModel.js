import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;

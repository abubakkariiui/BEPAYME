import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

const contactPost = asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;

  const contactData = await Contact.create({
    name,
    phone,
    email,
    message,
  });

  if (contactData) {
    res.status(201).json({
      _id: contactData._id,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      message: contactData.message,
    });
  } else {
    res.status(400);
    throw new Error("Contact not Saved");
  }
});

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.json(contact);
});

export {contactPost,getContacts};

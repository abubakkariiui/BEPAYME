import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const agentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    cnic: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    pranchiseName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 100000,
    },
    frontCNIC: {
      type: String,
      required: true,
    },
    backCNIC: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

agentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;

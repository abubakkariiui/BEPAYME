import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const EmployeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number
    },
    address: {
      type: String
    },
    cnic: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

EmployeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
EmployeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Employe = mongoose.model("Employee", EmployeSchema);

export default Employe;

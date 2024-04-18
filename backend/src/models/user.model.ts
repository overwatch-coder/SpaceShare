import mongoose, { HydratedDocumentFromSchema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["host", "client"], default: "client" },
    avatar: { type: String },
    bio: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

// set strict populate to false
mongoose.set("strictPopulate", false);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export type UserType = HydratedDocumentFromSchema<typeof userSchema>;

const User = mongoose.model("User", userSchema);

export default User;

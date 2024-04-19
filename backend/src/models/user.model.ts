import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["host", "client"], default: "client" },
    age: { type: Number },
    gender: { type: String },
    hobbies: [{ type: String }],
    interests: [{ type: String }],
    smoker: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    drinker: { type: Boolean, default: false },
    profilePicture: { type: String },
    personalStory: { type: String },
    phone: { type: String },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true, versionKey: false }
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

// delete properties and bookings associated with user when user gets deleted
userSchema.pre(
  "deleteOne",
  { document: true, query: false },

  async function (next) {
    await this.model("Property").deleteMany({ owner: this._id });
    await this.model("Booking").deleteMany({ client: this._id });

    next();
  }
);

const User = mongoose.model("User", userSchema);

export default User;

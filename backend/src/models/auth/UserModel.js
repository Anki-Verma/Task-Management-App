import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"], // Validation for name
    },
    email: {
      type: String,
      required: [true, "Please provide an email"], // Validation for email
      unique: true, // Ensure the email is unique in the database
      trim: true, // Remove whitespace from the start and end
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, // Email format validation
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password!"], // Validation for password
    },
    photo: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/19819005?v=4", // Default avatar URL
    },
    bio: {
      type: String,
      default: "I am a new user.", // Default bio message
    },
    role: {
      type: String,
      enum: ["user", "admin", "creator"], // Allowed roles
      default: "user", // Default role
    },
    isVerified: {
      type: Boolean,
      default: false, // Default verification status
    },
  },
  { timestamps: true, minimize: true } // Automatically manage createdAt and updatedAt timestamps
);

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  // Check if the password has been modified
  if (!this.isModified("password")) {
    return next(); // Skip hashing if not modified
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Set the hashed password

  next(); // Proceed to the next middleware
});

// Create the User model
const User = mongoose.model("User", UserSchema);

export default User; // Export the User model

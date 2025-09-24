import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.PARTNER],
      default: ROLES.PARTNER,
    },
    availability: {
      type: Boolean,
      default: true, // only relevant for partners
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

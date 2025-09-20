import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username wajib diisi'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password wajib diisi'],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;

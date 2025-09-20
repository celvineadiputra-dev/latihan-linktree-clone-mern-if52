import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul tautan wajib diisi'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon wajib diisi'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL wajib diisi'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LinkModel = mongoose.model('Link', LinkSchema);

export default LinkModel;

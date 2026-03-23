import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Bhautik Vachhani' },
  title: { type: String, default: 'Full Stack Developer' },
  profilePicture: { type: String, default: '/profile.jpeg' },
  bio: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);

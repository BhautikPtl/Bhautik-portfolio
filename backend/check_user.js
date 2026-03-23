import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const checkUser = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI.split('@')[1]); // Log host only for safety
    await mongoose.connect(process.env.MONGODB_URI);
    const admin = await Admin.findOne({ username: 'bhautik' });
    if (admin) {
      console.log('User found:', admin.username);
      console.log('Hashed Password:', admin.password);
    } else {
      console.log('User NOT found');
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUser();

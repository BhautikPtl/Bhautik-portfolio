import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    let admin = await Admin.findOne();
    if (admin) {
      admin.username = 'admin';
      admin.password = 'admin123';
      await admin.save();
      console.log('Updated existing admin to username: admin, password: admin123');
    } else {
      await Admin.create({ username: 'admin', password: 'admin123' });
      console.log('Created new admin with username: admin, password: admin123');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
run();

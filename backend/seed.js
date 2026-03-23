import Admin from './models/Admin.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'bhautik' });
    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      await Admin.create({
        username: 'bhautik',
        password: 'password123' // In production, this should be changed immediately
      });
      console.log('Admin seeded: bhautik / password123');
    }
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();

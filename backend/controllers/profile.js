import Profile from '../models/Profile.js';
import path from 'path';
import fs from 'fs';

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, title, bio } = req.body;
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile();
    }

    if (name) profile.name = name;
    if (title) profile.title = title;
    if (bio) profile.bio = bio;
    
    if (req.file) {
      profile.profilePicture = `/uploads/${req.file.filename}`;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

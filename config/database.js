import mongoose from 'mongoose';
import { APP_DATABASE } from './config.js';

export const database = async () => {
  try {
    console.log('Starting MongoDB connection...');

    const response = await mongoose.connect(APP_DATABASE);

    console.log(`Connected successfully to MongoDB at ${response.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('connecting to mongoose');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to mongoose');
  } catch(error) {
    console.error("Error: ", error);
  }
};

export default connectDB;
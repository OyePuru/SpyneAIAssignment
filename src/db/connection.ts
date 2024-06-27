import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const connectionUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await mongoose.connect(connectionUrl, {
      authSource: 'admin'
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;

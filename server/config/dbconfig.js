import mongoose from "mongoose";

const dbconnect = () => {
    (async () => {
        try {
          await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000, 
          });
          console.log('MongoDB connected successfully');
        } catch (error) {
          console.error('MongoDB connection failed:', error.message);
        }
      })();
}

export default dbconnect;



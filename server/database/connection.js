import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connection =  () => {
 mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("Failed to connect to MongoDB:", err); 
  });
}; 

export default connection;

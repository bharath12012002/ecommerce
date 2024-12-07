import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};  

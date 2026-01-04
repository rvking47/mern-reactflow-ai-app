import mongoose from "mongoose";

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_SERVER);
        console.log("MongoDB is connected!!");
    }
    catch (err) {
        console.log("MongoDB connection failed:", err.message);
    }
}

export default ConnectDB;
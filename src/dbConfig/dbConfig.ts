import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
    try {
        const MONGO_URI = 'mongodb+srv://kumarshresth2004:Shresth%40123@cluster0.lly1dz4.mongodb.net/auth-next-js?retryWrites=true&w=majority&appName=Cluster0'
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(MONGO_URI);

        const connection = mongoose.connection;
        connection.on('connected', () => console.log('MongoDB connected successfully'));
        connection.on('error', (err) => {
            console.log('MongoDB connection error ' + err);
            process.exit(1);
        });

    } catch (error) {
        console.log(error);
        process.exit(1); // Exit the process with a failure code
    }
}

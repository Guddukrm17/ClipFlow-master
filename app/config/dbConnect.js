import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return; // Prevent re-connecting if already connected
    }

    try {
        const connectMongo = await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('Database Connected:', connectMongo.connection.host);
    } catch (err) {
        console.error('Database Connection Error:', err);
    }
};

export default connectDB;

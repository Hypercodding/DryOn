import mongoose from 'mongoose';

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const globalForMongoose = globalThis as unknown as {
    mongoose: MongooseCache | undefined;
};

let cached: MongooseCache = globalForMongoose.mongoose || { conn: null, promise: null };

if (!globalForMongoose.mongoose) {
    globalForMongoose.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
    const MONGODB_URI = process.env.DATABASE_URL || '';

    if (!MONGODB_URI) {
        throw new Error('Please define the DATABASE_URL environment variable');
    }

    if (cached.conn) {
        // Check if connection is still alive
        if (mongoose.connection.readyState === 1) {
            return cached.conn;
        } else {
            // Connection is dead, reset cache
            cached.conn = null;
            cached.promise = null;
        }
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('Failed to establish MongoDB connection:', e);
        throw e;
    }

    return cached.conn;
}

export default connectDB;


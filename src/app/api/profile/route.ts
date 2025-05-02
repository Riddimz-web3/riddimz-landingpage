import { NextResponse } from 'next/server';
import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the UserProfile interface
interface IUserProfile {
  publicKey: string;
  username: string;
  avatar: string;
}

// Extend Document for Mongoose
interface IUserProfileDocument extends IUserProfile, Document {}

// Define the schema
const userProfileSchema = new Schema<IUserProfileDocument>(
  {
    publicKey: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);

// Create or reuse the model with explicit typing
const UserProfile: Model<IUserProfileDocument> =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfileDocument>('UserProfile', userProfileSchema);

// MongoDB connection
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'riddmz',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

// GET handler for fetching user profile
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get('publicKey');

  if (!publicKey) {
    return NextResponse.json({ error: 'Public key is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const profile = await UserProfile.findOne({ publicKey: publicKey }).lean().exec();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      publicKey: profile.publicKey,
      username: profile.username,
      avatar: profile.avatar,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
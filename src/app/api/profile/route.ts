import { NextResponse } from 'next/server';
import mongoose, { Model } from 'mongoose';
import { Schema, model, models } from 'mongoose';

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
  
  

// Connect to MongoDB
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

// GET: Fetch user profile by publicKey
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get('publicKey');

  if (!publicKey) {
    return NextResponse.json({ error: 'publicKey is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const profile = await UserProfile.findOne({ publicKey });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create or update user profile
export async function POST(request: Request) {
  try {
    const { publicKey, username, avatar } = await request.json();

    if (!publicKey || !username || !avatar) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const profile = await UserProfile.findOneAndUpdate(
      { publicKey },
      { publicKey, username, avatar },
      { upsert: true, new: true }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}







import { connectDB } from "@/lib/databaseConnection";
import { jwtVerify } from 'jose';
import UserModel from '@/models/User.model.js';
import { catchError, response } from '@/lib/helperFunctions';

export const POST = async (req) => {
  try {
    await connectDB();

    const { token } = await req.json();

    if (!token) {
      return response(
        false,
        400,
        "Missing token"
      );
    }

    // Get secret from env var and encode
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    // Verify token and extract payload
    // const { payload } = await jwtVerify(token, secret);
    const decoded = await jwtVerify(token, secret);
    
    const userId = decoded.payload.userId;

    // if (!userId) {
    //   return response(
    //     false,
    //     400,
    //     'Invalid or expired token'
    //   );
    // }

    // Lookup user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(
        false,
        404,
        'User not found'
      );
    }

    user.isEmailVerified = true;
    await user.save();

    return response(
      true,
      200,
      "Email verification success"
    );
  } catch (error) {
    return catchError(error, "Failed to verify email");
  }
};

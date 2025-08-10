import { connectDB } from '@/lib/databaseConnection';
import OtpModel from '@/models/Otp.model.js';
import { z } from 'zod';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { catchError, response } from '@/lib/helperFunctions';
import { zSchema } from '@/lib/zodSchema';
import UserModel from '@/models/User.model.js';

export const POST = async (req) => {
  try {
    await connectDB();


    const payload = await req.json();


    const validationSchema = zSchema.pick({
        otp: true, email: true,
    })

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        'Invalid or missing input fields',
        { error: validatedData.error }
      );
    }

    const { otp, email } = validatedData.data;


    const otpDoc = await OtpModel.findOne({ email, otp });
    if (!otpDoc) {
      return response(
        false,
        404,
        'Invalid or expired OTP'
      );
    }


    const user = await UserModel.findOne({ email, deletedAt: null }).lean();

    if (!user) {
      return response(
        false,
        404,
        'User not found'
      );
    }


    const loginUser = {
      _id: user._id,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    };


    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT(loginUser)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'access_token',
      value: token,
      httpOnly: process.env.NODE_ENV === 'production',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    await otpDoc.deleteOne();

    
    return response(
      true,
      200,
      'Login successful',
      loginUser
    );

  } catch (error) {
    return catchError(error, 'Failed to verify OTP');
  }
};

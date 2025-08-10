
import { connectDB } from '@/lib/databaseConnection';
import { jwtVerify, SignJWT } from 'jose';
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { z } from 'zod';
import { zSchema } from '@/lib/zodSchema';
import UserModel from '@/models/User.model.js';
import { generateOTP, catchError, response } from '@/lib/helperFunctions';
import OtpModel from '@/models/Otp.model';
import { otpEmail } from '@/email/otpEmail';

export const POST = async (req) => {
  try {
    await connectDB();

    // 1. Parse and validate payload
    const payload = await req.json();

    const validationSchema = zSchema.pick({
      email: true,
    }).extend({
        password: z.string(),
    });

    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        'Invalid or missing input fields',
        { error: validatedData.error }
      );
    }

    const { email, password } = validatedData.data;

    const user = await UserModel.findOne({ deletedAt: null, email }).select("+password")
    if (!user) {
      return response(
        false,
        404,
        'Invalid login credentials'
      );
    }

    

    if (!user.isEmailVerified) {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY)
        const token = await new SignJWT({ userId: user._id.toString() })
            .setIssuedAt()
            .setExpirationTime('1h')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        await sendMail("Email Verification Request from Gaurav Lokhande",
            email,
            emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
        );
      return response(
        false,
        401,
        'Your email is not verified. We have sent a verification link to your registered email address.'
      );
    }


    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return response(
        false,
        400,
        'Invalid login credentials'
      );
    }

    await OtpModel.deleteMany({ email });

    // 6. Generate new OTP and store
    const otp = generateOTP();
    const newOtpEntry = new OtpModel({ email, otp });
    await newOtpEntry.save();

    // 7. Send OTP email
    const mailStatus = await sendMail(
      'Your Login Verification Code',
      email,
      otpEmail(otp)
    );
    if (!mailStatus.success) {
      return response(
        false,
        500,
        'Failed to send OTP.'
      );
    }

    return response(
      true,
      200,
      'Please verify your device. OTP sent to your email.'
    );

  } catch (error) {
    return catchError(error, 'Failed to login');
  }
};

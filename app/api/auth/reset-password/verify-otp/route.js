import { connectDB } from '@/lib/databaseConnection';
import OtpModel from '@/models/Otp.model.js';
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


    await otpDoc.deleteOne();

    
    return response(
      true,
      200,
      'OTP Verified',
    );

  } catch (error) {
    return catchError(error, 'Failed to verify OTP');
  }
};

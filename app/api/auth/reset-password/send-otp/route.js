import {connectDB} from '@/lib/databaseConnection';
import OtpModel from '@/models/Otp.model.js';
import { catchError, response, generateOTP } from '@/lib/helperFunctions';
import { zSchema } from '@/lib/zodSchema';
import UserModel from '@/models/User.model.js';
import { otpEmail } from '@/email/otpEmail';
import { sendMail } from '@/lib/sendMail';

export const POST = async (req) => {
    try {
        await connectDB();

        const payload = await req.json();
        const validationSchema = zSchema.pick({
            email: true,
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

        const { email } = validatedData.data;


        const user = await UserModel.findOne({ email, deletedAt: null }).lean();
        if (!user) {
            return response(
                false,
                404,
                'User not found'
            );
        }


        await OtpModel.deleteMany({ email });


        const otp = generateOTP();
        const newOtp = new OtpModel({ email, otp });
        await newOtp.save();


        const mailStatus = await sendMail(
            'Your Login Verification Code',
            email,
            otpEmail(otp)
        );

        if (!mailStatus.success) {
            return response(false, 500, 'Failed to send OTP.');
        }

        return response(true, 200, 'Please verify your account.');
    } catch (error) {
        return catchError(error, 'Failed to send reset OTP');
    }
};
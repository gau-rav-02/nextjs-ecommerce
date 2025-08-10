import {connectDB} from '@/lib/databaseConnection';
import { catchError, response } from '@/lib/helperFunctions';
import { zSchema } from '@/lib/zodSchema';
import UserModel from '@/models/User.model';

export const PUT = async (req) => {
  try {
    await connectDB();

    const payload = await req.json();

    
    const validationSchema = zSchema.pick({
      email: true, password: true,
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

    const { email, password } = validatedData.data;


    const user = await UserModel.findOne({ email, deletedAt: null }).select('+password');
    if (!user) {
      return response(false, 404, 'User not found');
    }


    user.password = password;
    await user.save();

    return response(true, 200, 'Password updated successfully');
  } catch (error) {
    return catchError(error, 'Failed to update password');
  }
};
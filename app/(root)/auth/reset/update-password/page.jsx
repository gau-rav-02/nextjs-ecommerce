import connectDB from '@/lib/databaseConnection';
import User from '@/models/User.model.js';
import { catchError, response } from '@/lib/helpers';
import { z } from 'zod';

export const PUT = async (req) => {
try {
await connectDB();

text
// Parse payload
const payload = await req.json();

// Validation schema: email + strong password (reuse zod rules from central schema if desired)
const validationSchema = z.object({
  email: z.string().email(),
  password: z.string(), // Strong rules are enforced on FE; here just require a string
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

// Find user and include password field for update
const user = await User.findOne({ email, deletedAt: null }).select('+password');
if (!user) {
  return response(false, 404, 'User not found');
}

// Update password; pre-save hook will hash it
user.password = password;
await user.save();

return response(true, 200, 'Password updated success');
} catch (error) {
return catchError(error, 'Failed to update password');
}
};
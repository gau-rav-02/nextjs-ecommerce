import {connectDB} from '@/lib/databaseConnection';
import { catchError, response } from '@/lib/helperFunctions';
import { cookies } from 'next/headers';


export const POST = async (req) => {
  try {
    await connectDB();

    const cookieStore = await cookies();
    cookieStore.delete('access_token');

    return response(true, 200, 'Logout successful');
    
  } catch (error) {
    catchError(error)
  }
};

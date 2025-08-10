import { Description } from '@radix-ui/react-dialog';
import {z} from 'zod'

export const zSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, {message: "Password must be at most 64 characters long"})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

    name: z.string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
    
    otp: z.string()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must contain only digits" }),

    _id: z.string().min(3, {message: '_id is required'}),
    alt: z.string().min(3, {message: 'alt is required'}),
    title: z.string().min(3, {message: 'title is required'}),
    slug: z.string().min(3, {message: 'slug is required'}),
    // title: z.string().min(3, {message: 'title is required'}),
    category: z.string().min(3, {message: 'category is required'}),
    mrp: z.union([z.number().positive('expected positive value, received negative'),
       z.string().transform((val) => Number(val) && val >= 0, 'please enter a number'),]),
    
    sellingPrice: z.union([z.number().positive('expected positive value, received negative'),
       z.string().transform((val) => Number(val) && val >= 0, 'please enter a number'),]),
       
    discountPercentage: z.union([z.number().positive('expected positive value, received negative'),
       z.string().transform((val) => Number(val) && val >= 0, 'please enter a number'),]),
  
    description: z.string().min(3, {message: 'description is required'}),
    
    media: z.array(z.string()),


  });
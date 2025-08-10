import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { zSchema } from '@/lib/zodSchema';
import ButtonLoading from './ButtonLoading';
import axios from 'axios';
import { showToast } from '@/lib/toast';



const OtpVerificationForm = ({ email, onSubmit, loading, onResendOtp, resendLoading }) => {
    
    const [isResendingOtp, setIsResendingOtp] = useState(false);

    const otpSchema = zSchema.pick({
        otp: true, email: true,
    })
  
    const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
      email: email,
    },
  });

  const handleOtpVerification = async (values) => {
        onSubmit(values)
    }

const resendOtp = async () => {
    try {
        setIsResendingOtp(true)
        const {data: resendOtpResponse} = await axios.post('/api/auth/resend-otp', {email})
        if(!resendOtpResponse.success){
            throw new Error(resendOtpResponse.message)
        }
        showToast('success', resendOtpResponse.message)
    } catch (error) {
        showToast('error', error.message)
    } finally{
        setIsResendingOtp(false)
    }
}

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)} className="space-y-4">
            <div className="text-center mb-2">
                <h1 className="text-2xl font-bold mb-1">Please complete verification</h1>
                <p className="text-md">
                    We have sent a one-time password to your registered email address. The OTP is valid for 10 minutes only.
                </p>
                </div>
                <div className='mb-5 flex justify-center'>
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>One Time Password (OTP)</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot className="text-xl size-10" index={0} />
                                        <InputOTPSlot className="text-xl size-10" index={1} />
                                        <InputOTPSlot className="text-xl size-10" index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot className="text-xl size-10" index={3} />
                                        <InputOTPSlot className="text-xl size-10" index={4} />
                                        <InputOTPSlot className="text-xl size-10" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='mb-3'>
                    <ButtonLoading loading={loading} type="submit" text="Verify" className='w-full cursor-pointer' />
                </div>
                <div className="text-center mt-4">
                <button
                    type="button"
                    onClick={resendOtp}
                    className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
                    disabled={resendLoading}
                >
                    {isResendingOtp ? 'Resending...' : 'Resend OTP'}
                </button>
            </div>
        </form>
    </Form>
  );
};

export default OtpVerificationForm;

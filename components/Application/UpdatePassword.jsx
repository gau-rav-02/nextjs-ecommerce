'use client'

import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zSchema } from '@/lib/zodSchema'
import ButtonLoading from '@/components/Application/ButtonLoading'
import z from 'zod'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from 'axios'
import { showToast } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'


const UpdatePassword = ({email}) => {
    const router = useRouter()
    const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false)
    const [isTypePassword, setisTypePassword] = useState(true)

    const formSchema = zSchema.pick({
        password: true, email: true
    }).extend({
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password and Confirm Password must be same",
        path: ["confirmPassword"],
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            password: "",
            confirmPassword: "",
        }
    })

    const handlePasswordUpdate = async (values) =>{
        try {
            setUpdatePasswordLoading(true)
            const {data: passwordUpdateResponse} = await axios.put('/api/auth/reset-password/update-password', values)
            if(!passwordUpdateResponse.success){
                throw new Error(passwordUpdateResponse.message)
            }
            form.reset()
            showToast('success', passwordUpdateResponse.message)
            router.push(WEBSITE_LOGIN)
        } catch (error) {
            showToast('error', error.message)
        } finally{
            setUpdatePasswordLoading(false)
        }
    }

  return (

        <div>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>Update Password</h1>
                <p>Create new Password by filling below form</p>
            </div>
            <div className='mt-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handlePasswordUpdate)}>
                        
                        
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={isTypePassword? "password":"text"} placeholder="********" {...field} />
                                        
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type={isTypePassword? "password":"text"} placeholder="********" {...field} />
                                        
                                    </FormControl>
                                    <button type='button' className='absolute top-1/2 right-2 cursor-pointer' onClick={() => setisTypePassword(!isTypePassword)}>
                                        {
                                            isTypePassword? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </button>
                                    
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <ButtonLoading loading={updatePasswordLoading} type="submit" text="Update Password" className='w-full cursor-pointer' />
                        </div>

                    </form>
                </Form>
            </div>
        </div>

  )
}

export default UpdatePassword
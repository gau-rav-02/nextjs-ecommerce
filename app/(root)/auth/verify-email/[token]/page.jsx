'use client';

import { use, useState, useEffect } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import verifiedImg from '@/public/assets/images/verified.gif';
import verificationFailedImg from '@/public/assets/images/verification-failed.gif';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';

const EmailVerification = ({params}) => {
  const { token } = use(params)
  console.log(token)

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post('/api/auth/verify-email', { token });
        if (res.data?.success) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) verify();
  }, [token]);

  return (
    <Card style={{ width: 400, margin: '0 auto', marginTop: 50 }}>
      <CardContent>
        <div className="flex justify-center items-center mb-5">
          <Image
            src={isVerified ? verifiedImg : verificationFailedImg}
            alt={isVerified ? 'Verification Success' : 'Verification Failed'}
            width={100}
            height={100}
            className="h-[100px] w-auto"
          />
        </div>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-5 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
            {isLoading
              ? 'Please wait...'
              : isVerified
                ? 'Email Verification Success'
                : 'Email Verification Failed'}
          </h1>
          {isVerified ? (
            <Button asChild>
              <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={WEBSITE_HOME}>Go to Home</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EmailVerification
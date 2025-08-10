'use client';

import Image from 'next/image';
import loadingImg from '@/public/assets/images/loading.svg';

const Loading = () => {
return (
<div className="h-screen w-screen flex justify-center items-start mt-12">
<Image src={loadingImg} alt="Loading" height={80} width={80} />
</div>
);
};

export default Loading;
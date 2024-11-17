import DefaultButton from '@/components/DefaultButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='w-screen min-h-content py-8 flex flex-col items-center justify-center'>
      <div className='container'>
        <div className='relative flex items-center w-full max-w-[34.5rem] aspect-[552/383] mx-auto max-md:max-w-[20.625rem]'>
          <Image
            src='/character_404.svg'
            alt='넘어가기'
            fill
            sizes='100%'
          ></Image>
        </div>
        <div className='text-center mt-16 max-md:mt-[3.25rem]'>
          <h1 className='title-40 text-primary-600 max-md:text-xl'>죄송해요! 요청하신 페이지를 불러올수없어요</h1>
          <p className='title-20 text-gray-500 mt-6 max-md:title-16 max-md:mt-[3.25rem]'>
            페이지의 주소가 잘못입력 되었거나<br></br> 요청하신 주소가 변경 혹은 삭제되어 찾을수 없습니다.
          </p>
        </div>
        <div className='mt-20'>
          <DefaultButton
            asChild
            className='min-w-[23.875rem] mt-[2.688rem] mx-auto max-md:min-w-full'
          >
            <Link href='/'>홈으로</Link>
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

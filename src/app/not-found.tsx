import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='w-screen min-h-content py-10 flex flex-col items-center justify-center'>
      <div>
        <Image
          src='/character_404.svg'
          width={552}
          height={383}
          alt='넘어가기'
        ></Image>
      </div>
      <div className='text-center font-bold mt-[2.687rem]'>
        <h1 className='text-[2.5rem] text-primary-600'>죄송해요! 요청하신 페이지를 불러올수없어요</h1>
        <p className='text-xl text-primary-400 leading-normal mt-[1.563rem]'>
          페이지의 주소가 잘못입력 되었거나<br></br> 요청하신 주소가 변경 혹은 삭제되어 찾을수 없습니다.
        </p>
        <Link
          className='block w-[23.875rem] mx-auto mt-[2.688rem] rounded-lg py-[0.813rem] bg-primary-400 body-18 text-white'
          href='/'
        >
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

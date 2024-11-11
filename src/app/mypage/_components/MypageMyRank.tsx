'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import { User, Rank } from '@/types/mypage';
import { fetchUserRank } from '@/utils/rank/client-action';
import { useAuth } from '@/queries/useAuth';
import { fetchCurrentUserInfo } from '@/utils/user/client-action';

const MypageMyRank = () => {
  const [user, setUser] = useState<User>();
  const [rank, setRank] = useState<Rank>();
  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      const email = data?.user_metadata.email;
      fetchCurrentUserInfo(email).then((elemant) => setUser(elemant));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const user_id = data?.user_metadata.sub;
      fetchUserRank(user_id).then((element) => setRank(element));
    }
  }, []);

  return (
    <div className='flex flex-col min-w-[16.125rem] bg-primary-300 rounded-3xl text-center'>
      <div className='py-5'>
        <h3 className='title-24 text-primary-800'>내 랭킹</h3>
        <p className='caption-12 text-primary-500'>24.10.13 - 24.10.19</p>
      </div>
      <div className='h-2 bg-primary-200 border-t-2 border-primary-400 opacity-40' />

      <div className='grow flex flex-col justify-center items-center pt-4 pb-7'>
        <div className='relative flex pt-6'>
          <div className='absolute top-0 left-1/2 z-10 -translate-x-1/2'>
            <Image
              width={38}
              height={38}
              src='/crown.png'
              alt='crown'
            />
          </div>
          <Avatar
            size='6.625rem'
            src={user?.image}
            className='mx-auto'
          />
        </div>
        <div className='title-40 text-white mt-2'>{rank?.ranking || '-'}위</div>
      </div>

      {/* 지난주 순위 */}
      <div className='h-1 bg-primary-100 border-t-2 border-primary-400 opacity-40' />
      <div className='flex justify-center items-center py-4'>
        <h3>
          <span className='title-16 text-primary-500'>지난주 순위</span>
          <span className='body-22 ml-[3.25rem] text-primary-700'>{rank?.ranking || '-'}위</span>
        </h3>
      </div>
    </div>
  );
};

export default MypageMyRank;

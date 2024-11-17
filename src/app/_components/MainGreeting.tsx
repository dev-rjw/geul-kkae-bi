'use client';

import { useAuth } from '@/queries/useAuth';
import { useUser } from '@/queries/useUser';
import LineTitle from '@/components/LineTitle';

const MainGreeting = () => {
  const { data } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);

  return (
    data && (
      <div className='hidden max-lg:flex items-end justify-between mb-[1.125rem]'>
        <div className='text-xl leading-[130%]'>
          <div className='font-bold text-primary-300'>어서오세요,</div>
          <LineTitle
            className='text-primary-500'
            lineClassName='bg-primary-100'
          >
            {user?.nickname}님!
          </LineTitle>
        </div>
        <div className='text-sm font-bold text-gray-400'>오늘의 게임에 도전해보세요.</div>
      </div>
    )
  );
};

export default MainGreeting;

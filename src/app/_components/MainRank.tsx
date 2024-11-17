'use client';

import { Card } from '@/components/ui/card';
import { weekCalculate } from '@/utils/rank/client-action';
import { useAuth } from '@/queries/useAuth';
import { useRouter } from 'next/navigation';
import { useRank } from '@/queries/useRank';

export type Rank = {
  user_id: string;
  id: string;
  speaking: string | null;
  checking: string | null;
  writing: string | null;
  total: string | null;
  ranking: string | null;
  week: string;
  created_at: string;
  user: {
    nickname: string;
  };
};

const MainRank = () => {
  const { data: user } = useAuth();
  const { data: ranks } = useRank(weekCalculate(0));
  const router = useRouter();

  return (
    <Card className='relative flex flex-col h-full min-h-64 rounded-[1.25rem] border-0 bg-[#DCE8FA] shadow-none overflow-hidden max-lg:rounded-2xl'>
      {!user?.id && (
        <div
          className='absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center'
          style={{ backdropFilter: 'blur(10px)' }}
        >
          <div
            className='text-[2.5rem] font-yangjin text-white text-center'
            style={{ textShadow: '0 0 12px rgb(27,99,203)' }}
          >
            랭킹이 <br />
            궁금하시다면 <br />
            로그인해주세요
          </div>
        </div>
      )}

      <div
        className='pt-7 pb-4 text-center cursor-pointer max-lg:pt-[1.125rem] max-lg:pb-[0.875rem]'
        onClick={() => router.push('/games/rank')}
      >
        <div className='text-[1.75rem] font-yangjin text-primary-600 leading-none max-lg:text-xl'>랭킹 TOP 3</div>
        <div className='body-18 text-primary-300 mt-1 max-lg:text-sm'>이번주 랭킹을 확인해보세요!</div>
      </div>
      <div className='h-[0.625rem] bg-primary-50 border-t-2 border-primary-100 max-lg:h-2' />
      <div
        className='flex grow items-center cursor-pointer'
        onClick={() => router.push('/games/rank')}
      >
        <div className='w-full pb-5 max-lg:pt-[0.625rem] max-lg:pb-3'>
          {ranks?.map((rank, index) => {
            return (
              <div
                key={index}
                className='flex items-center py-[0.625rem] pr-[1.25rem] max-lg:py-[0.375rem] max-lg:pr-[1.875rem]'
              >
                <div
                  className={`${
                    (index === 0 && ' bg-primary-400') ||
                    (index === 1 && ' bg-primary-300') ||
                    (index === 2 && ' bg-primary-200')
                  } flex items-center h-[2.625rem] pl-6 pr-[1.125rem] rounded-r-[0.875rem] max-lg:h-[2.375rem] max-lg:pl-10 max-lg:pr-4 max-lg:rounded-r-lg`}
                >
                  <span className='title-24 text-primary-50 translate-y-[5%] max-lg:text-lg'>{index + 1}위</span>
                </div>
                <div className='flex flex-grow items-center justify-between pl-6 max-lg:pl-4'>
                  <div className='title-24 text-primary-700 translate-y-[5%] max-lg:text-lg max-sm:text-ellipsis'>{rank.user.nickname} </div>
                  <div className='title-20 text-primary-300 translate-y-[5%] max-lg:text-lg'>{rank.total}점</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default MainRank;

'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { fetchRankTop3, weekCalculate } from '@/utils/rank/client-action';
import { useAuth } from '@/queries/useAuth';
import { useRouter } from 'next/navigation';

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
  const { data } = useAuth();
  const router = useRouter();

  // Tanstack쿼리 사용하기
  const [ranks, setRanks] = useState<Rank[]>([]);
  useEffect(() => {
    fetchRankTop3(weekCalculate(0)).then((elemant) => setRanks(elemant!));
  }, []);

  return (
    <Card className='relative flex flex-col rounded-[1.25rem] border-0 bg-[#DCE8FA] shadow-none overflow-hidden'>
      {!data?.id && (
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
        className='pt-7 pb-4 text-center cursor-pointer'
        onClick={() => router.push('/games/rank')}
      >
        <div className='text-[1.75rem] font-yangjin text-primary-600 leading-none'>랭킹 TOP 3</div>
        <div className='body-18 text-primary-300 mt-1'>이번주 랭킹을 확인해보세요!</div>
      </div>
      <hr className='border-t-2 border-primary-100' />
      <hr className='border-t-8 border-primary-50' />
      <div
        className='flex grow items-center cursor-pointer'
        onClick={() => router.push('/games/rank')}
      >
        <div className='w-full pb-5'>
          {ranks.map((rank, index) => {
            return (
              <div
                key={index}
                className='flex items-center py-[0.625rem] pr-[1.25rem]'
              >
                <div
                  className={`${
                    (index === 0 && ' bg-primary-400') ||
                    (index === 1 && ' bg-primary-300') ||
                    (index === 2 && ' bg-primary-200')
                  } flex items-center h-[2.625rem] pl-6 pr-[1.125rem] rounded-r-[0.875rem]`}
                >
                  <span className='title-24 text-primary-50 translate-y-[5%]'>{index + 1}위</span>
                </div>
                <div className='flex flex-grow items-center justify-between pl-[0.938rem]'>
                  <div className='title-24 text-primary-700 translate-y-[5%]'>{rank.user.nickname} </div>
                  <div className='title-20 text-primary-300 translate-y-[5%]'>{rank.total}점</div>
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

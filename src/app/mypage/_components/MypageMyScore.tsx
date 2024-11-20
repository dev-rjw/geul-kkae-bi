'use client';

import Image from 'next/image';
import { weekCalculate } from '@/utils/rank/client-action';
import { useAuth } from '@/queries/useAuth';
import { useUserRank } from '@/queries/useRank';

const MypageMyScore = () => {
  const { data: user } = useAuth();
  const user_id = user?.id;
  const { data: rank } = useUserRank(user_id!, weekCalculate(0));

  return (
    <div className='rounded-3xl w-full h-full bg-primary-50 max-lg:h-auto max-md:min-w-[auto] max-md:rounded-[0.875rem]'>
      <div className='flex w-full h-full max-md:flex-col'>
        <div className='flex flex-col w-1/3 min-w-[10.375rem] rounded-3xl items-center justify-center p-4 bg-primary-100 max-md:w-full max-md:min-w-[auto] max-md:bg-transparent max-md:p-0'>
          <h2 className='title-24 text-primary-800 max-md:text-xl max-md:pt-4 max-md:pb-[0.875rem]'>게임별 점수</h2>
          <div className='h-[0.375rem] bg-gray-50 border-t-2 border-primary-100 hidden max-md:block max-md:w-full' />

          <div className='max-md:w-full max-md:flex max-md:items-center max-md:justify-between max-md:px-6 max-md:py-2'>
            <p className='title-20 text-primary-400 text-center mt-6 max-md:text-base max-md:mt-0'>총점</p>
            <p className='body-32 text-primary-700 mt-1 max-md:text-xl max-md:mt-0'>
              {rank?.total === null ? '-' : rank?.total}점
            </p>
          </div>
        </div>
        <div className='h-1 bg-gray-50 border-t-2 border-primary-100 hidden max-md:block' />

        <div className='flex flex-col w-2/3 max-md:w-full max-md:h-full'>
          <div className='flex items-center justify-center pl-3 pr-4 py-4 h-1/3 max-md:py-[0.875rem] max-md:pl-4'>
            <div className='flex items-center gap-5 min-w-[11.5rem] max-md:gap-3 max-md:min-w-[7.625rem]'>
              <div className='relative flex items-center w-[4.5rem] aspect-[72/62] max-md:w-[2.625rem]'>
                <Image
                  src='/character_speak.svg'
                  alt='Cat icon'
                  fill
                  sizes='100%'
                  priority
                />
              </div>
              <div className='flex flex-col'>
                <span className='title-16 pb-2 text-primary-400 max-md:text-xs max-md:pb-1'>나야, 발음왕</span>
                <span className='body-30 text-primary-700 max-md:text-xl'>
                  {rank?.speaking === null ? '-' : rank?.speaking}점
                </span>
              </div>
            </div>
          </div>
          <div className='h-1 bg-primary-100 border-t-2 border-primary-200 opacity-40 max-md:hidden' />

          <div className='flex items-center justify-center pl-3 pr-4 py-4 h-1/3 max-md:py-[0.875rem] max-md:pl-4'>
            <div className='flex items-center gap-5 min-w-[11.5rem] max-md:gap-3 max-md:min-w-[7.625rem]'>
              <div className='relative flex items-center w-[4.5rem] aspect-[72/62] max-md:w-[2.625rem]'>
                <Image
                  src='/character_checking.svg'
                  alt='Cat icon'
                  fill
                  sizes='100%'
                  priority
                />
              </div>
              <div className='flex flex-col'>
                <span className='title-16 pb-2 text-primary-400 max-md:text-xs max-md:pb-1'>틀린 말 탐정단</span>
                <span className='body-30 text-primary-700 max-md:text-xl'>
                  {rank?.checking === null ? '-' : rank?.checking}점
                </span>
              </div>
            </div>
          </div>
          <div className='h-1 bg-primary-100 border-t-2 border-primary-200 opacity-40 max-md:hidden' />

          <div className='flex items-center justify-center pl-3 pr-4 py-4 h-1/3 max-md:py-[0.875rem] max-md:pl-4'>
            <div className='flex items-center gap-5 min-w-[11.5rem] max-md:gap-3 max-md:min-w-[7.625rem]'>
              <div className='relative flex items-center w-[4.5rem] aspect-[72/62] max-md:w-[2.625rem]'>
                <Image
                  src='/character_writing.svg'
                  alt='Cat icon'
                  fill
                  sizes='100%'
                  priority
                />
              </div>
              <div className='flex flex-col'>
                <span className='title-16 pb-2 text-primary-400 max-md:text-xs max-md:pb-1'>빈칸 한 입</span>
                <span className='body-30 text-primary-700 max-md:text-xl'>
                  {rank?.writing === null ? '-' : rank?.writing}점
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageMyScore;

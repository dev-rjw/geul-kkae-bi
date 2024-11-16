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
    <div className='rounded-3xl w-full h-full bg-primary-50'>
      <div className='flex w-full h-full'>
        <div className='flex flex-col w-1/3 min-w-[10.375rem] rounded-3xl items-center justify-center p-4 bg-primary-100'>
          <h2 className='title-24 text-primary-800'>게임별 점수</h2>
          <p className='title-20 text-primary-400 mt-6'>총점</p>
          <p className='body-32 text-primary-700 mt-1'>{rank?.total === null ? '-' : rank?.total}점</p>
        </div>

        <div className='flex flex-col w-2/3'>
          <div className='flex items-center justify-center gap-5 pl-3 pr-4 py-4 h-1/3'>
            <Image
              src='/character_speak.svg'
              alt='Cat icon'
              width={72}
              height={62}
            />
            <div className='flex flex-col'>
              <span className='title-16 pb-2 text-primary-400'>주어진 문장 읽기</span>
              <span className='body-30 text-primary-700'>{rank?.speaking === null ? '-' : rank?.speaking}점</span>
            </div>
          </div>
          <div className='h-1 bg-primary-100 border-t-2 border-primary-200 opacity-40' />

          <div className='flex items-center justify-center gap-5 pl-3 pr-4 py-4 h-1/3'>
            <Image
              src='/character_checking.svg'
              alt='Cat icon'
              width={72}
              height={62}
            />
            <div className='flex flex-col'>
              <span className='title-16 pb-2 text-primary-400'>틀린 것 맞추기</span>
              <span className='body-30 text-primary-700'>{rank?.checking === null ? '-' : rank?.checking}점</span>
            </div>
          </div>
          <div className='h-1 bg-primary-100 border-t-2 border-primary-200 opacity-40' />

          <div className='flex items-center justify-center gap-5 pl-3 pr-4 py-4 h-1/3'>
            <Image
              src='/character_writing.svg'
              alt='Cat icon'
              width={72}
              height={62}
            />
            <div className='flex flex-col'>
              <span className='title-16 pb-2 text-primary-400'>빈칸 채우기</span>
              <span className='body-30 text-primary-700'>{rank?.writing === null ? '-' : rank?.writing}점</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageMyScore;

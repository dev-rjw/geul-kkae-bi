'use client';
// import LineTitle from '@/components/LineTitle';
import { useAuth } from '@/queries/useAuth';
import { useUserRank } from '@/queries/useRank';
import { weekCalculate } from '@/utils/rank/client-action';
import Image from 'next/image';

const MypageCharacter = () => {
  const { data } = useAuth();
  const user_id = data?.id;
  const { data: rank } = useUserRank(user_id!, weekCalculate(0));

  return (
    <>
      <div className='bg-primary-50 rounded-3xl border border-primary-100'>
<<<<<<< HEAD
        {rank?.total === null ? (
=======
        <div className='flex justify-center mb-6 mt-8'>
          <LineTitle
            className='text-[2rem] text-primary-500'
            lineClassName='bg-primary-100'
          >
            RANKING
          </LineTitle>
        </div>

        <Image
          src={'/coding.svg'}
          alt='Profile'
          width={609}
          height={267}
          className='object-cover justify-self-center'
        />
      </div>

      <div className='hidden justify-center items-center h-[20vh] bg-blue-50'>
        <div className='relative'>
          <div className='bg-purple-200 text-purple-800 p-4 rounded-lg w-40'>
            덕분에 도깨비 왕국을 열심히 재건 중이야.
          </div>
          <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2'>
            <svg
              className='text-purple-200 w-6 h-6'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M24 12l-8-8v4H8v8h8v4z' />
            </svg>
          </div>
        </div>

        <div className='relative mx-8'>
>>>>>>> 12cf69bccb50483059fc1e4420c82cdb12ebec72
          <Image
            src={'/character0.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total !== null && rank?.total >= 0 && rank?.total < 75 ? (
          <Image
            src={'/character1.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 75 && rank?.total < 150 ? (
          <Image
            src={'/character2.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 150 && rank?.total < 224 ? (
          <Image
            src={'/character3.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 225 && rank?.total <= 300 ? (
          <Image
            src={'/character4.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
      </div>

      <div></div>
    </>
  );
};

export default MypageCharacter;

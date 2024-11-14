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
        {rank?.total === null ? (
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

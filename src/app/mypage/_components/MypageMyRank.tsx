'use client';

import Image from 'next/image';
import Avatar from '@/components/Avatar';
import { weekCalculate } from '@/utils/rank/client-action';
import { useAuth } from '@/queries/useAuth';
import { useUserRank } from '@/queries/useRank';
import { useUser } from '@/queries/useUser';
import { fetchLatestWeekData } from '@/utils/rank/server-action';
import { RankIncludingUserInfo } from '@/types/rank';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const MypageMyRank = () => {
  const { data } = useAuth();
  const email = data?.user_metadata.email;
  const user_id = data?.id;

  const { data: user } = useUser(email);
  const { data: beforeRank } = useUserRank(user_id!, weekCalculate(-1));

  const [rank, setRank] = useState<number>(0);

  const fetchLatestWeekRank = async () => {
    const latestWeekData = await fetchLatestWeekData();
    if (latestWeekData) {
      const latestWeek = latestWeekData.week;

      const { data }: { data: RankIncludingUserInfo[] | null } = await createClient()
        .from('rank')
        .select(`*,user(nickname, introduction, image)`)
        .eq('week', latestWeek)
        .gte('total', 0)
        .order('total', { ascending: false });

      //이번주 전체 등수
      const countRanking = data?.map((item, index) => ({ ...item, ranking: index + 1 }));
      //이번주 내 등수
      const userTable = countRanking?.filter((user) => user.user_id === user_id);

      return userTable?.[0]?.ranking;
    }
  };

  useEffect(() => {
    fetchLatestWeekRank().then((element) => {
      setRank(element!);
    });
  }, [rank]);

  const fetchThisWeek = () => {
    // 금주 일자를 알려주는 알고리즘
    const currentDay = new Date();
    const theYear = currentDay.getFullYear();
    const theMonth = currentDay.getMonth();
    const theDate = currentDay.getDate();
    const theDayOfWeek = currentDay.getDay();
    const thisWeek = [];

    for (let i = 0; i < 7; i++) {
      const resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
      const yyyy = resultDay.getFullYear();
      let mm = String(Number(resultDay.getMonth()) + 1);
      let dd = String(resultDay.getDate());

      mm = mm.length === 1 ? '0' + mm : mm;
      dd = dd.length === 1 ? '0' + dd : dd;

      thisWeek[i] = yyyy + '-' + mm + '-' + dd;
    }
    return thisWeek;
  };

  return (
    <div className='flex flex-col min-w-[16.125rem] bg-primary-300 rounded-3xl text-center max-md:w-full max-md:min-w-[auto] max-md:rounded-[0.875rem]'>
      <div className='py-5 max-md:px-2 max-md:pb-4'>
        <h3 className='title-24 text-primary-800 max-md:text-xl'>내 랭킹</h3>
        <p className='caption-12 text-primary-500'>
          <span className='inline-block'>{fetchThisWeek()[0]}</span> ~{' '}
          <span className='inline-block'>{fetchThisWeek()[6]}</span>
        </p>
      </div>
      <div className='h-2 bg-primary-200 border-t-2 border-primary-400 opacity-40 max-md:h-[0.375rem]' />

      <div className='grow flex flex-col justify-center items-center pt-4 pb-7 max-md:py-4'>
        <div className='relative flex pt-6'>
          <div className='absolute top-0 left-1/2 z-10 -translate-x-1/2'>
            <Image
              width={38}
              height={38}
              src='/crown.png'
              alt='crown'
              priority
            />
          </div>
          <Avatar
            src={user?.image}
            size='6.625rem'
            className='mx-auto w-[6.625rem] h-[6.625rem]'
          />
        </div>
        <div className='title-40 text-white mt-2'>{rank || '-'}위</div>
      </div>

      <div className='h-1 bg-primary-100 border-t-2 border-primary-400 opacity-40' />
      <div className='flex justify-center items-center py-4 max-md:px-5 max-md:justify-between'>
        <span className='title-16 text-primary-500 max-md:text-xs'>지난주 순위</span>
        <span className='body-22 ml-[3.25rem] text-primary-700 max-md:text-sm max-sm:ml-auto'>
          {beforeRank?.ranking || '-'}위
        </span>
      </div>
    </div>
  );
};

export default MypageMyRank;

import { createClient } from '@/utils/supabase/server';
import React from 'react';
// import Image from 'next/image';
import { Rank, RankIncludingUserInfo } from '@/types/result';
import { fetchUserId } from '@/utils/auth/server-action';
import Image from 'next/image';
import './style.css';
import Link from 'next/link';

const RankingPage = async () => {
  const serverClient = createClient();
  const userId = await fetchUserId();

  //가장 최신 week 가져오기(숫자가 클수록 최신)->기준이 되는 week
  const { data: latestWeekData }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
    .not('week', 'is', null)
    .order('week', { ascending: false })
    .limit(1);

  console.log('latestWeekData!!!', latestWeekData);
  // latestWeekData [
  //   {
  //     user_id: 'e651a7f4-9594-4e10-9fdf-f6858b26fd59',
  //     checking: 20,
  //     speaking: 0,
  //     writing: 20,
  //     created_at: '2024-11-01T03:20:24.031187+00:00',
  //     id: 'dc29e732-880c-4397-9c1d-c547f03e26e9',
  //     total: 60,
  //     week: 2,
  //     ranking: null
  //   }
  // ]

  //이번주 랭킹 로직

  //이번주 테이블 모두 가져오고 전체 랭킹매겨주고 내 등수에 관한 로직(ui로 실시간 반영, supabase 반영 안됨)
  //똑같은 점수인 경우에는 먼저 점수를 흭득한사람이 앞등수
  let userTable;
  let countRanking;

  if (latestWeekData && latestWeekData.length > 0) {
    const latestWeek = latestWeekData[0].week;

    const { data }: { data: RankIncludingUserInfo[] | null } = await serverClient
      .from('rank')
      .select(`*,user(nickname, introduction, image)`)
      .eq('week', latestWeek)
      .gte('total', 0)
      .order('total', { ascending: false });

    if (data && data.length > 0) {
      //이번주 전체 등수
      countRanking = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      console.log('countRanking', countRanking);
      //이번주 내 등수
      userTable = countRanking?.filter((user) => user.user_id === userId);
    }
  }
  console.log('userTable', userTable);
  console.log('countRanking', countRanking);

  //지난주 랭킹 로직

  //가장 최근 데이터의 week가 1주가 아닐때 실행시켜주고 && 지난주 테이블 랭킹에 점수가 안 들어가 있으면 지난주 최종점수를 기준으로 내림차순으로 가져와서 랭킹을 매겨서 supabase 랭킹점수에 넣어준다.
  if (latestWeekData && latestWeekData[0].week - 1 > 0) {
    const lastWeek = latestWeekData[0].week - 1;

    //지난주 테이블 모두 가져오는데 토탈점수가 높은거부터 내림차순 정렬
    const { data: lastWeekData } = await serverClient
      .from('rank')
      .select()
      .eq('week', lastWeek)
      .not('total', 'is', null)
      .order('total', { ascending: false });
    console.log('lastWeekData', lastWeekData);

    //지난주 테이블에 랭킹 기록이 없을시에 랭킹을 매겨주고 랭킹을 넣어줌
    if (lastWeekData?.[0].ranking === null) {
      const countRanking: Rank[] | null = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));
      const insertLastRankingData = async () => {
        const { data, error } = await serverClient.from('rank').upsert(countRanking);
        if (error) {
          console.error('Error posting Ranking data', error);
          return;
        }
        console.log('Ranking Data posted successfully', data);
      };
      insertLastRankingData();
    }
    //내 아이디랑 일치하는 지난 테이블 가져오는 로직
    const { data: myLastrank }: { data: Rank[] | null } = await serverClient
      .from('rank')
      .select()
      .eq('user_id', userId)
      .eq('week', lastWeek);

    return (
      <div className='h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center w-[1080px] h-[805px] mt-8 bg-[#EDF3FD] rounded-[50px] relative '>
            <div className='flex justify-between items-center h-[51px] mt-8 px-[8.5px] gap-x-2'>
              <div className='rounded-[0.25rem]'>
                <Image
                  src='/icon_rank.svg'
                  width={45}
                  height={45}
                  alt='랭킹순위 옆 아이콘'
                />
              </div>
              <h1 className='title-36 text-[#357EE7]'>이번주 전체 랭킹 순위</h1>
            </div>
            <div className='flex flex-col w-[1050px] h-[540px] overflow-y-scroll space-y-5 mt-8 pb-[1.125rem]'>
              {countRanking?.slice(0, 3)?.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center bg-[#98A7F1] top_rank w-[896px] py-2 mx-auto rounded-[1rem]'
                >
                  <div className='flex justify-center title-24 w-24 '>{item.ranking}등</div>
                  <div className='w-[78px] h-[78px]'>
                    <Image
                      width={78}
                      height={78}
                      src={item.user.image}
                      alt='profile image for ranking'
                    />
                  </div>
                  <strong className='title-24 font-normal w-[11.25rem] pl-4 text-[#0e3976]'>
                    {item.user.nickname}
                  </strong>
                  <p className='title-24 w-[22.75rem] pl-4 text-[#fff]'>{item.user.introduction}</p>
                  <span className='title-36 ml-auto pr-8 text-[#0e3976]'>{item.total}점</span>
                </div>
              ))}
              {countRanking?.slice(3, 5)?.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center bg-[#C5CDF7] w-[896px] mx-auto py-[0.438rem] rounded-[1rem]'
                >
                  <div className='flex justify-center title-20 w-24 text-[#0e3976]'>{item.ranking}등</div>
                  <div className='w-[62px] h-[62px]'>
                    <Image
                      width={62}
                      height={62}
                      src={item.user.image}
                      alt='profile image for ranking'
                    />
                  </div>
                  <strong className='title-20 w-[8.563rem] pl-4 text-[#0e3976] '>{item.user.nickname}</strong>
                  <p className='title-20 w-[15.125rem] pl-4 text-[#647BEE]'>{item.user.introduction}</p>
                  <span className='title-36 ml-auto pr-8 text-[#0e3976]'>{item.total}점</span>
                </div>
              ))}
              {countRanking?.slice(5)?.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center bg-[#C5CDF7] w-[896px] mx-auto py-[0.375rem] rounded-[1rem]'
                >
                  <div className=' flex justify-center title-20 w-24 text-[#0e3976]'>{item.ranking}등</div>
                  <div className='w-[40px] h-[40px]'>
                    <Image
                      width={40}
                      height={40}
                      src={item.user.image}
                      alt='profile image for ranking'
                    />
                  </div>
                  <div className='title-20 w-[8.563rem] pl-4 text-[#0e3976]'>{item.user.nickname}</div>
                  <div className='title-20 w-[15.125rem] pl-4 text-[#647BEE]'>{item.user.introduction}</div>
                  <div className='title-32 ml-auto pr-8 text-[#0e3976]'>{item.total}점</div>
                </div>
              ))}
            </div>
            <div className='flex items-center w-[1080px] h-[151px] bg-[#BFD6F7] rounded-[20px] absolute bottom-0'>
              {/* <div className='w-[110px] h-[113px] rounded-[22.37px] ml-[1.439rem] bg-slate-300'>사진</div> */}
              <div className='w-[110px] h-[113px] rounded-[22.37px] ml-[1.439rem]'>
                <Image
                  width={110}
                  height={113}
                  src={userTable?.[0]?.user.image ?? ''}
                  alt='profile image for my ranking'
                />
              </div>
              <div className='flex flex-col items-center ml-[2.133rem] gap-[5px]'>
                <div className='flex items-center justify-center title-16 w-[214px] h-[27px] text-[#357EE7]'>
                  {userTable?.[0]?.user.nickname}
                </div>
                <div className='flex items-center justify-center title-14 w-[214px] h-[79px] bg-[#EDF3FD] rounded-[12px] '>
                  {userTable?.[0]?.user.introduction}
                </div>
              </div>
              <div className='flex flex-col justify-between ml-[2.753rem] w-[12.813rem] h-[5.563rem] title-20'>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>나의 랭킹</div>
                  <div className='text-[#357EE7]'>{userTable?.[0]?.ranking}등</div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>지난주 순위</div>
                  <div className='text-[#134FA4]'>{myLastrank ? myLastrank?.[0]?.ranking : ''}등</div>
                </div>
              </div>
              <div className='flex flex-col justify-between ml-[2.753rem] w-[15.25rem] h-[7.5rem] title-16 '>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>주어진 문장읽기</div>
                  <div className='text-[#134FA4]'>{userTable?.[0]?.speaking}점</div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>빈칸채우기</div>
                  <div className='text-[#134FA4]'>{userTable?.[0]?.writing}점</div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>틀린것 맞추기</div>
                  <div className='text-[#134FA4]'>{userTable?.[0]?.checking}점</div>
                </div>
                <div className='flex justify-between'>
                  <div className='text-[#0E3976]'>총합 점수</div>
                  <div className='text-[#134FA4]'>{userTable?.[0]?.total}점</div>
                </div>
              </div>
              <Link href={'/mypage'}>
                <div className='flex justify-center text-center items-center w-[93px] h-[84px] ml-[2.753rem] title-16 bg-[#357EE7] text-[#fff] rounded-[14.38px]'>
                  내정보 <br />
                  보러가기
                </div>
              </Link>
            </div>
          </div>

          {/* <div>
            <div>닉네임 : {userTable?.[0].user.nickname}</div>
            <div>소개 : {userTable?.[0].user.introduction}</div>
            <div>나의 랭킹 : {userTable?.[0].ranking}</div>
            <div>
              {' '}
              {myLastrank ? <div>{`지난주 순위 : ${myLastrank?.[0]?.ranking}`}</div> : <div>지난주 순위 : </div>}
            </div>
            <div>주어진 문장읽기 : {userTable?.[0].speaking}</div>
            <div>빈칸 채우기 : {userTable?.[0].writing}</div>
            <div>틀린것 맞추기 : {userTable?.[0].checking}</div>
            <div>총합 점수 : {userTable?.[0].total}</div>
          </div> */}
        </div>
      </div>
    );
  }
};

export default RankingPage;

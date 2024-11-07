'use client';
import Header from '@/components/Header';
import { useAuth } from '@/queries/useAuth';
import { fetchCurrentUserInfo } from '@/utils/user/client-action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import KKAEBI from '../../../public/kkae_bi.png';
import { useRouter } from 'next/navigation';
import { fetchUserRank } from '@/utils/rank/client-action';
import CROWN from '../../../public/crown.png';

export type User = {
  user_id: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  email: string;
  created_at: string;
};

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
};

function MyPage() {
  const [user, setUser] = useState<User>();
  const [rank, setRank] = useState<Rank>();
  const { data } = useAuth();
  const router = useRouter();

  if (data === null) {
    router.push('/');
  }

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
    <>
      <Header />
      <div className='flex justify-center items-center min-h-[85vh] pt-[1.875rem]'>
        {/* 전체 박스 */}
        <div className='flex flex-wrap lg:flex-nowrap w-full max-w-[67.5rem] rounded-lg gap-4'>
          {/* 프로필 섹션 */}
          <div className='bg-blue-500 rounded-[1.5rem] text-white min-w-[21.813rem] w-full lg:w-1/3 h-[795px] p-6 flex flex-col items-center'>
            {/* 프로필 제목 */}
            <h2 className='text-2xl font-bol mb-6 text-white font-bold inline-block bg-gradient-to-r from-blue-300 to-blue-300 bg-no-repeat bg-[length:100%_0.3em] bg-bottom pb-1'>
              MY PAGE
            </h2>
            {/* 프로필 이미지 */}
            <div className='w-[17rem] h-[17rem] overflow-hidden relative rounded-full border-4 border-white mb-4 '>
              {user?.image && (
                <Image
                  src={user?.image}
                  alt='Profile'
                  width={272}
                  height={272}
                  className='w-[17rem] h-[17rem] rounded-full object-cover'
                />
              )}
            </div>
            <h2 className='text-2xl font-bold'>{user?.nickname}</h2>
            <p className='text-xl mb-1 text-blue-200'>{user?.email}</p>
            <p className='text-xl text-center mb-6 text-blue-200'>
              {user?.introduction?.trim() ? user?.introduction?.trim() : '한 줄 요약이 없습니다.'}
            </p>
            <div className='flex gap-3'>
              <button
                className='bg-blue-600 text-sm font-semibold py-2 px-4 rounded mb-2'
                onClick={() => router.push('/mypage/information')}
              >
                프로필 변경
              </button>
              <button
                className='bg-blue-600 text-sm font-semibold py-2 px-4 rounded mb-2'
                onClick={() => router.push('/mypage/change-password')}
              >
                비밀번호 변경
              </button>
            </div>
            <button className='text-sm underline mt-auto'>로그아웃</button>
          </div>

          {/* 랭킹 섹션 */}
          <div className='w-full max-w[44.75rem] lg:w-2/3 flex flex-col gap-4'>
            {/* 랭킹 제목 */}
            <div className='bg-primary-50 rounded-[2.313rem] border border-solid border-primary-100'>
              <h2 className='flex justify-self-center text-2xl pt-5 font-bold text-blue-600 mb-6 w-[110px] bg-gradient-to-r from-blue-300 to-blue-300 bg-no-repeat bg-[length:100%_0.3em] bg-bottom pb-1'>
                RANKING
              </h2>

              <Image
                src={'/coding.svg'}
                alt='Profile'
                width={609}
                height={267}
                className='object-cover justify-self-center'
              />
            </div>

            {/* 캐릭터와 말풍선 */}
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
                <Image
                  src={KKAEBI}
                  alt='Character'
                  width={180}
                  height={180}
                />
              </div>

              <div className='relative'>
                <div className='bg-green-200 text-green-800 p-4 rounded-lg w-40'>
                  병을 완전히 고치려면 OOO이 더 필요해
                </div>
                <div className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2'>
                  <svg
                    className='text-green-200 w-6 h-6'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M0 12l8-8v4h8v8H8v4z' />
                  </svg>
                </div>
              </div>
            </div>

            {/* 랭킹 정보 */}
            <div className='flex grid-cols-2 gap-4 rounded-xl'>
              {/* 내 랭킹 */}
              <div className='flex flex-col row-span-2 bg-primary-300 rounded-3xl text-center min-w-[16.125rem]'>
                <div className='pb-6 pt-[1.125rem] border-primary-400'>
                  <h3 className='title-24 text-primary-800'>내 랭킹</h3>
                  <p className='caption-12 text-primary-500'>24.10.13 - 24.10.19</p>
                </div>
                <div className='pt-4 border-t-[6px] border-primary-200 '>
                  <div>
                    <Image
                      src={CROWN}
                      alt='crown'
                      className='place-self-center mb-[-12px]'
                    />
                  </div>
                  <div className='w-[6.625rem] h-[6.625rem] rounded-full overflow-hidden border-4 border-white mb-4 justify-self-center'>
                    {user?.image && (
                      <Image
                        src={user?.image}
                        alt='Profile'
                        width={106}
                        height={106}
                        className='w-[6.625rem] h-[6.625rem] rounded-full object-cover'
                      />
                    )}
                  </div>
                  <div className='mt-1.5 title-36 pb-6 text-white border-b border-primary-400'>
                    {rank?.ranking || '-'}위
                  </div>
                </div>
                {/* 지난주 순위 */}
                <div className='flex justify-center items-center h-full py-[1.156rem] border-t border-primary-200'>
                  <h3 className='title-16 text-primary-500'>
                    지난주 순위
                    <span className='ml-10 title-16 text-primary-700'>{rank?.ranking || '-'}위</span>
                  </h3>
                </div>
              </div>

              {/* 게임별 점수 */}
              <div className='w-full'>
                <div className='rounded-xl '>
                  <div className='flex'>
                    {/* 게임별 점수 총점 */}
                    <div className='bg-primary-100 flex flex-col min-w-[10.438rem] rounded-3xl items-center justify-center p-4 w-1/3 h-[425px]'>
                      <h2 className='title-24 text-primary-800'>게임별 점수</h2>
                      <p className='title-20 text-primary-400 mt-[1.5rem]'>총점</p>
                      <p className='body-32 text-primary-700 '>{rank?.total || '-'}점</p>
                    </div>

                    {/* 게임별 점수 */}
                    <div className='flex flex-col divide-y rounded-r-3xl bg-primary-50 relative w-full ml-[-1.5rem] pl-6 -z-10'>
                      {/* 1 */}
                      <div className='flex items-center px-9 h-[33.333%] border-b border-[#C9DCF9]'>
                        <Image
                          src={'character_speak.svg'}
                          alt='Cat icon'
                          width={240}
                          height={240}
                          className='w-[4.375rem] h-[3.813rem]'
                        />
                        <div className='ml-5 flex flex-col'>
                          <span className='title-16 pb-2 text-primary-400'>주어진 문장 읽기</span>
                          <span className='body-30 text-primary-700'>{rank?.speaking || '-'}점</span>
                        </div>
                      </div>
                      {/* 2 */}
                      <div className='flex items-center p-9 h-[33.333%] border-t border-[#DBE7FB] border-b-[#C9DCF9]'>
                        <Image
                          src={'character_checking.svg'}
                          alt='Cat icon'
                          width={240}
                          height={240}
                          className='w-[4.5rem] h-[3.813rem]'
                        />
                        <div className='ml-5 flex flex-col'>
                          <span className='title-16 pb-2 text-primary-400'>틀린 것 맞추기</span>
                          <span className='body-30 text-primary-700'>{rank?.checking || '-'}점</span>
                        </div>
                      </div>
                      {/* 3 */}
                      <div className='flex items-center p-9 h-[33.333%] border-t-[#C9DCF9]'>
                        <Image
                          src={'character_writing.svg'}
                          alt='Cat icon'
                          width={240}
                          height={240}
                          className='w-[4.5rem] h-[3.813rem]'
                        />
                        <div className='ml-5 flex flex-col'>
                          <span className='title-16 pb-2 text-primary-400'>빈칸 채우기</span>
                          <span className='body-30 text-primary-700'>{rank?.writing || '-'}점</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;

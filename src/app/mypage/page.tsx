'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuth } from '@/queries/useAuth';
import { fetchCurrentUserInfo } from '@/util/user/client-action';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SAMPLE from '../../img/sample.png';
import KKAEBI from '../../img/kkae-bi.png';

export type User = {
  user_id: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  email: string;
  created_at: string;
};

function MyPage() {
  const [user, setUser] = useState<User>();
  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      const email = data?.user_metadata.email;
      fetchCurrentUserInfo(email).then((elemant) => setUser(elemant));
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className='flex justify-center items-center min-h-[75vh] bg-gray-100'>
        {/* 전체 박스 */}
        <div className='flex flex-wrap lg:flex-nowrap w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* 프로필 섹션 */}
          <div className='bg-blue-500 text-white w-full lg:w-1/3 p-6 flex flex-col items-center'>
            {/* 프로필 제목 */}
            <h2 className='text-2xl font-bol mb-6 text-white font-bold inline-block bg-gradient-to-r from-blue-300 to-blue-300 bg-no-repeat bg-[length:100%_0.3em] bg-bottom pb-1'>
              MY PAGE
            </h2>
            {/* 프로필 이미지 */}
            <div className='w-52 h-52 rounded-full overflow-hidden border-4 border-white mb-4'>
              <Image
                src={user?.image ? user?.image : SAMPLE}
                alt='Profile'
                width={200}
                height={200}
              />
            </div>
            <h2 className='text-xl font-bold'>{user?.nickname}</h2>
            <p className='text-sm mb-1'>{user?.email}</p>
            <p className='text-sm text-center mb-6'>
              {user?.introduction?.trim() ? user?.introduction?.trim() : '한 줄 요약이 없습니다.'}
            </p>
            <button className='bg-blue-700 text-sm font-semibold py-2 px-4 rounded mb-2'>내 정보 수정하기</button>
            <button className='text-sm underline mt-[6rem]'>로그아웃</button>
          </div>

          {/* 랭킹 섹션 */}
          <div className='w-full lg:w-2/3 p-6 bg-gray-50 flex flex-col'>
            {/* 랭킹 제목 */}
            <h2 className='text-2xl font-bold text-blue-600 mb-6 w-[110px] inline-block bg-gradient-to-r from-blue-300 to-blue-300 bg-no-repeat bg-[length:100%_0.3em] bg-bottom pb-1'>
              RANKING
            </h2>

            {/* 캐릭터와 말풍선 */}
            <div className='flex justify-center items-center h-[20vh] bg-blue-50'>
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
            <div className='grid grid-cols-2 gap-4'>
              {/* 내 랭킹 */}
              <div className='row-span-2 bg-yellow-100 p-4 rounded-lg text-center'>
                <h3 className='text-lg font-semibold'>내 랭킹</h3>
                <p className='text-sm text-gray-600'>24.10.13 - 24.10.19</p>
                <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-white mb-4 justify-self-center'>
                  <Image
                    src={user?.image ? user?.image : SAMPLE}
                    alt='Profile'
                    width={196}
                    height={196}
                  />
                </div>
                <div className='mt-4 text-3xl font-bold'>523위</div>
              </div>

              {/* 지난주 순위 */}
              <div className='flex bg-white p-4 rounded-lg text-center shadow-sm'>
                <div>
                  <h3 className='text-lg font-semibold'>지난주 순위</h3>
                  <p className='text-sm text-gray-600'>24.10.13 - 24.10.19</p>
                </div>
                <div className='mt-4 text-3xl font-bold'>523위</div>
              </div>

              {/* 게임별 점수 */}
              <div className='flex bg-white p-4 rounded-lg shadow-sm'>
                <div>
                  <h3 className='text-lg font-semibold text-center mb-2'>게임별 점수</h3>
                  <div className='text-center mt-4 text-xl font-bold text-gray-800'>총점 90점</div>
                </div>

                <div className='flex justify-between text-gray-700'>
                  <div className='flex flex-col items-center'>
                    <span className='text-sm'>주어진 문장 읽기</span>
                    <span className='text-xl font-bold'>30점</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-sm'>빈칸 채우기</span>
                    <span className='text-xl font-bold'>30점</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='text-sm'>틀린 것 맞추기</span>
                    <span className='text-xl font-bold'>30점</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;

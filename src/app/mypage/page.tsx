import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import MypageProfile from './_components/MypageProfile';
import MypageCharacter from './_components/MypageCharacter';
import MypageMyRank from './_components/MypageMyRank';
import MypageMyScore from './_components/MypageMyScore';
import { Loader2 } from 'lucide-react';
import { fetchCurrentUser } from '@/utils/auth/server-action';

const MyPage = async () => {
  const user = await fetchCurrentUser();

  if (!user?.id) {
    redirect('/signin');
  }

  return (
    <div className='container py-10 max-md:pt-0'>
      <div className='flex flex-wrap gap-4 max-lg:flex-col max-lg:flex-nowrap'>
        <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
          <MypageProfile />
        </Suspense>

        <div className='flex flex-col gap-4 w-[calc(100%-22.875rem)] max-lg:w-full'>
          <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
            <MypageCharacter />
          </Suspense>

          <div className='flex gap-4'>
            <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
              <MypageMyRank />
            </Suspense>

            <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
              <MypageMyScore />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

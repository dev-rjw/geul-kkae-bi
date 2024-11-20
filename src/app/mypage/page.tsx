import { redirect } from 'next/navigation';
import MypageProfile from './_components/MypageProfile';
import MypageCharacter from './_components/MypageCharacter';
import MypageMyRank from './_components/MypageMyRank';
import MypageMyScore from './_components/MypageMyScore';
import { fetchCurrentUser } from '@/utils/auth/server-action';

const MyPage = async () => {
  const user = await fetchCurrentUser();

  if (!user?.id) {
    redirect('/signin');
  }

  return (
    <div className='container py-10 max-md:pt-0'>
      <div className='flex flex-wrap gap-4 max-lg:flex-col max-lg:flex-nowrap'>
        <MypageProfile />

        <div className='flex flex-col gap-4 w-[calc(100%-22.875rem)] max-lg:w-full'>
          <MypageCharacter />

          <div className='flex gap-4'>
            <MypageMyRank />
            <MypageMyScore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

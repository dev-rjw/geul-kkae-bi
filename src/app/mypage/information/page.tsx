import { Suspense } from 'react';
import { Metadata } from 'next';
import Tabs from '../_components/Tabs';
import ChangeProfile from '../_components/ChangeProfile';
import { Loader2 } from 'lucide-react';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '마이페이지 - 프로필 변경',
  description: '마이페이지 - 프로필 변경',
};

const ProfileEdit = async () => {
  const user = await fetchCurrentUser();

  if (!user?.id) {
    redirect('/signin');
  }

  return (
    <div className='container py-10 max-md:pt-[0.625rem]'>
      <Tabs />
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        <ChangeProfile />
      </Suspense>
    </div>
  );
};

export default ProfileEdit;

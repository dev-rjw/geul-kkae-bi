import { Suspense } from 'react';
import { Metadata } from 'next';
import Tabs from '../_components/Tabs';
import ChangeProfile from '../_components/ChangeProfile';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '마이페이지 - 프로필 변경',
  description: '마이페이지 - 프로필 변경',
};

const ProfileEdit = () => {
  return (
    <div className='container py-10'>
      <Tabs />
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        <ChangeProfile />
      </Suspense>
    </div>
  );
};

export default ProfileEdit;

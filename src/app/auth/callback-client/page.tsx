'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getLocalStorageValues } from '@/app/(sign)/utils/sign';
import { addScores } from '@/utils/rank/client-action';
import { fetchCurrentUser } from '@/utils/auth/client-action';

const CallbackClientPage = () => {
  const router = useRouter();

  const sendScoresToServer = async () => {
    const { checking, speaking, writing } = getLocalStorageValues();
    const user = await fetchCurrentUser();
    const userId = user?.id;

    await addScores({ userId, checking, speaking, writing });

    router.push('/');
  };

  useEffect(() => {
    sendScoresToServer();
  }, []);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Loader2 className='mr-2 h-12 w-12 animate-spin text-primary-400' />
    </div>
  );
};

export default CallbackClientPage;

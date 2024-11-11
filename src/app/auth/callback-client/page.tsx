'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  return <p>로딩 중...</p>;
};

export default CallbackClientPage;

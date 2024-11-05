import React from 'react';
import GuestPage from '../_components/GuestPage';
import { JustEndedGameProp } from '@/types/result';
import { redirect } from 'next/navigation';
import { fetchUserId } from '@/utils/auth/server-action';

const page = async ({ searchParams }: JustEndedGameProp) => {
  //현재 접속중인 userID
  const userId = await fetchUserId();

  //회원이면 메인으로 돌려보냄 = protected route
  if (userId) {
    redirect('/');
  }

  return <GuestPage searchParams={searchParams} />;
};

export default page;

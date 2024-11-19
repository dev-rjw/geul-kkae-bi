import React from 'react';
import { redirect } from 'next/navigation';
import { JustEndedGameProp } from '@/types/result';
import { fetchUserId } from '@/utils/auth/server-action';
import Guest from '../_components/Guest';

const GuestPage = async ({ searchParams }: JustEndedGameProp) => {
  //현재 접속중인 userID
  const userId = await fetchUserId();

  //회원이면 메인으로 돌려보냄 = protected route
  if (userId) {
    redirect('/');
  }

  return <Guest searchParams={searchParams} />;
};

export default GuestPage;

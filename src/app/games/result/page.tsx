import { createClient } from '@/util/supabase/server';
import React from 'react';
import type { getServerSideProps } from 'next';

//로그인한 유저 아이디 가져오기
const fetchUserId = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log('user', user);
  if (user) {
    return user.user?.id;
  } else {
    return null;
  }
};

//로그인한 유저 닉네임 가져오기
const fetchUserNickName = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log('user', user);
  if (user) {
    return user.user?.user_metadata.nickname;
  } else {
    return null;
  }
};

//쿼리 받아오는 비동기 함수 : checking 이렇게 받으면 되지않을까?
export async function getServerSideProps(context: any) {
  const justEndedGame = context.query;

  return {
    props: {
      justEndedGame,
    },
  };
}

//쿼리를 getServerSideProps로 받아오려면 ssr 방식으로 적용해야함
export const dynamic = 'force-dynamic';

const resultPageForLogin = async ({ justEndedGame }) => {
  const serverClient = createClient();
  const { data: resultScore } = await serverClient.from('rank').select();
  console.log('resultScore', resultScore);

  const userId = await fetchUserId();
  console.log('userId', userId);
  const user = resultScore?.find((user) => user.user_id === userId);

  const nickName = await fetchUserNickName();
  console.log('nickName', nickName);

  justEndedGame;

  return (
    <div>
      {user.checking}
      {user.speaking}
      {user.writing}
      {nickName}
    </div>
  );
};

export default resultPageForLogin;

//  rank table들어오는 형식
//    data [
//       {
//         user_id: '4e376b1d-f1cf-49e6-b30b-086cb0cf35d7',
//         checking: 70,
//         speaking: 60,
//         writing: 50,
//         created_at: '2024-10-24T01:50:51.940078+00:00'
//       },
//       {
//         user_id: '993fb37b-6990-4b00-82ae-28462f0186ce',
//         checking: 60,
//         speaking: 70,
//         writing: 100,
//         created_at: '2024-10-24T01:51:10.335809+00:00'
//       }
//     ]

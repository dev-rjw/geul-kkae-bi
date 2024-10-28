/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchSpeek = async (uesrId: string, point: number) => {
  await browserClient.from('rank').upsert({ user_id: uesrId, speaking: point }).select();
};

export const getSpeekData = (userId: string, point: number) => {
  console.log(userId);

  return useQuery({
    queryKey: ['speak'],
    queryFn: () => fetchSpeek(userId, point),
  });
};

const fetchSpeekUser = async (userId: string) => {
  const { data } = await browserClient.from('rank').select('*').eq('user_id', userId);
  return data;
};

export const getSpeekDataUser = (userId: string) => {
  console.log(userId);

  return useQuery({
    queryKey: ['speak'],
    queryFn: () => fetchSpeekUser(userId),
  });
};

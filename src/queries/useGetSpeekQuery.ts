/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const fetchSpeek = async (userId: string) => {
  const { data } = await browserClient.from('rank').select('*').eq('user_id', userId);
  return data;
};

export const getSpeekData = (userId: string) => {
  return useQuery({
    queryKey: ['speek'],
    queryFn: () => fetchSpeek(userId),
  });
};

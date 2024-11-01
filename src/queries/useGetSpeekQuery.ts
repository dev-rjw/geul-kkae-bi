/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/util/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchSpeekUser = async (userId: string | undefined | null, weekNumber: number) => {
  const { data, error } = await browserClient.from('rank').select('*').eq('user_id', userId).eq('week', weekNumber);
  if (error || !userId) {
    throw new Error();
  } else {
    return data;
  }
};

export const useGetSpeekDataUser = (userId: string | undefined | null, weekNumber: number) => {
  return useQuery({
    queryKey: ['speak'],
    queryFn: () => fetchSpeekUser(userId, weekNumber),
    enabled: Boolean(userId),
    select: (data) => data || [],
  });
};

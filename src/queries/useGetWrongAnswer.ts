import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchWrongAnswer = async (user_id: string | null | undefined, weekNumber: number) => {
  const { data, error } = await browserClient
    .from('answer')
    .select('*')
    .eq('user_id', user_id)
    .eq('week', weekNumber)
    .eq('game', 'speaking');

  if (error || !user_id) {
    throw new Error();
  } else {
    return data;
  }
};

export const useGetWrongAnswer = (user_id: string | null | undefined, weekNumber: number) => {
  return useQuery({
    queryKey: ['answer'],
    queryFn: () => fetchWrongAnswer(user_id, weekNumber),
    enabled: Boolean(user_id),
  });
};

import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const fetchWrongAnswer = async (user_id: string | undefined, gameType: string, weekNumber: number) => {
  const { data, error } = await browserClient
    .from('answer')
    .select('*')
    .eq('user_id', user_id)
    .eq('week', weekNumber)
    .eq('game', gameType);

  if (error || !user_id) {
    throw new Error();
    console.log('error');
  } else {
    return data;
  }
};

export const useGetWrongAnswer = (user_id: string | undefined, gameType: string, weekNumber: number) => {
  return useQuery({
    queryKey: ['answer'],
    queryFn: () => fetchWrongAnswer(user_id, gameType, weekNumber),
  });
};

import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const fetchChekingQuestions = async () => {
  const { data, error } = await browserClient.rpc('get_checking_questions');
  if (error) {
    throw new Error('문제 데이터를 가져오지 못했습니다.');
  }
  return data;
};

export const useFetchQuestions = () => {
  return useQuery({
    queryKey: ['checkingQuestions'],
    queryFn: fetchChekingQuestions,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const fetchCheckingWrongAnswer = async (userId: string | null, weekNumber: number) => {
  const { data, error } = await browserClient
    .from('answer')
    .select('*')
    .eq('game', 'checking')
    .eq('user_id', userId)
    .eq('week', weekNumber);
  if (error) {
    throw new Error('틀린것 맞추기의 오답을 가져오지 못했습니다.', error);
  }
  return data;
};

export const useFetchCheckingWrongAnswer = (userId: string | null, weekNumber: number) => {
  return useQuery({
    queryKey: ['CheckingWrongAnswer'],
    queryFn: () => fetchCheckingWrongAnswer(userId, weekNumber),
    enabled: !userId,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

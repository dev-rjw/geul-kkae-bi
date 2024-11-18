import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const fetchWritingQuestions = async () => {
  const { data, error } = await browserClient.rpc('get_writing_questions');
  if (error) {
    throw new Error('문제 데이터를 가져오지 못했습니다.', error);
  }
  return data;
};

export const useFetchQuestions = () => {
  return useQuery({
    queryKey: ['writingQuestions'],
    queryFn: fetchWritingQuestions,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const fetchWritingWrongAnswer = async (userId: string | null, weekNumber: number) => {
  const { data, error } = await browserClient
    .from('answer')
    .select('*')
    .eq('game', 'writing')
    .eq('user_id', userId)
    .eq('week', weekNumber)
    .order('created_at', { ascending: false });
  if (error) {
    throw new Error('틀린 문제를 가져오지 못했습니다.', error);
  }
  return data;
};

export const useFetchWritingWrongAnswer = (userId: string | null, weekNumber: number) => {
  return useQuery({
    queryKey: ['WritingWrongAnswer'],
    queryFn: () => fetchWritingWrongAnswer(userId, weekNumber),
    enabled: !!userId,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

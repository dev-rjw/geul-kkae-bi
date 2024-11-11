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

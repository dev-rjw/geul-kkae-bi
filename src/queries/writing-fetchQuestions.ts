import browserClient from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const fetchWritingQuestions = async () => {
  const { data, error } = await browserClient.rpc('get_writing_questions');
  if (error) {
    throw new Error('문제 데이터를 가져오지 못했습니다.');
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

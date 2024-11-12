import { fetchRankTop3, fetchUserRank } from '@/utils/rank/client-action';
import { useQuery } from '@tanstack/react-query';

// user_id와 week로 현재 사용자의 rank 조회
export const useUserRank = (user_id: string, week: number) => {
  return useQuery({
    queryKey: ['ranks', user_id, week], // 각 user 고유한 쿼리 키
    queryFn: () => fetchUserRank(user_id, week),
    enabled: !!user_id, // user_id가 있을 때만 쿼리를 실행
  });
};

// week로 rank 조회
export const useRank = (week: number) => {
  return useQuery({
    queryKey: ['ranks', week],
    queryFn: () => fetchRankTop3(week),
  });
};

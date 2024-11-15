import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserInfoByEmail } from '@/utils/user/client-action';

// email로 현재 사용자 조회
export const useUser = (email: string) => {
  return useQuery({
    queryKey: ['users', email], // 각 user 고유한 쿼리 키
    queryFn: () => fetchCurrentUserInfoByEmail(email),
    enabled: !!email, // email이 있을 때만 쿼리를 실행
  });
};

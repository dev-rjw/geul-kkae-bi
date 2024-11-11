import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/utils/auth/client-action';
import { fetchCurrentUserInfo } from '@/utils/user/client-action';

// 현재 사용자 조회
export const useAuth = () => {
  return useQuery({
    queryKey: ['user', 'client'],
    queryFn: () => fetchCurrentUser(),
  });
};

// email로 현재 사용자 조회
export const useUser = (email: string) => {
  return useQuery({
    queryKey: ['users', email], // 각 user 고유한 쿼리 키
    queryFn: () => fetchCurrentUserInfo(email),
    enabled: !!email, // email이 있을 때만 쿼리를 실행
  });
};

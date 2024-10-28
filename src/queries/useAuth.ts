import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/util/auth/client-action';

// 현재 사용자 조회
export const useAuth = () => {
  return useQuery({
    queryKey: ['user', 'client'],
    queryFn: () => fetchCurrentUser(),
  });
};

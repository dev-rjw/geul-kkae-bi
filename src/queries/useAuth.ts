import { useQuery } from '@tanstack/react-query';
import { fetchSessionData } from '@/util/supabase/client-action';

export const useAuth = () => {
  return useQuery({
    queryKey: ['user', 'client'],
    queryFn: () => fetchSessionData(),
  });
};

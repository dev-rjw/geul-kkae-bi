import { fetchLatestWeek } from '@/utils/rank/server-action';
import { useQuery } from '@tanstack/react-query';

export const useGetLatestWeekData = (latestWeek: number) => {
  return useQuery({
    queryKey: ['rank', 'latestWeekData'],
    queryFn: () => fetchLatestWeek(latestWeek),
  });
};

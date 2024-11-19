import { fetchLatestWeek, fetchLatestWeekData } from '@/utils/rank/server-action';
import { useQuery } from '@tanstack/react-query';

export const useGetLatestWeekData = () => {
  return useQuery({
    queryKey: ['rank', 'latestWeekData'],
    queryFn: () => fetchLatestWeekData(),
  });
};

export const useGetLatestWeek = (latestWeek: number) => {
  return useQuery({
    queryKey: ['rank', latestWeek],
    queryFn: () => fetchLatestWeek(latestWeek),
  });
};

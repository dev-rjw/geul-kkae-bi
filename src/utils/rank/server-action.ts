'use server';

import { TotalScore } from '@/types/result';
import { createClient } from '../supabase/server';
import { Rank, RankIncludingUserInfo } from '@/types/rank';

export const updateTotalScore = async (totalScore: TotalScore) => {
  const supabase = createClient();
  const { error } = await supabase.from('rank').upsert(totalScore);
  if (error) {
    console.error('Error posting score data', error);
    return;
  }
};

export const insertLastRankingData = async (countRanking: Rank[]) => {
  const supabase = createClient();
  const { error } = await supabase.from('rank').upsert(countRanking);
  if (error) {
    console.error('Error posting Ranking data', error);
    return;
  }
};

export const fetchLatestWeekData = async () => {
  const supabase = createClient();
  const { data: latestWeekData }: { data: Rank | null } = await supabase
    .from('rank')
    .select()
    .not('week', 'is', null)
    .order('week', { ascending: false })
    .limit(1)
    .single();
  if (latestWeekData) {
    return latestWeekData;
  } else {
    return null;
  }
};

export const fetchLatestWeek = async (latestWeek: number) => {
  const supabase = createClient();
  const { data }: { data: RankIncludingUserInfo[] | null } = await supabase
    .from('rank')
    .select(`*,user(nickname, introduction, image)`)
    .eq('week', latestWeek)
    .gte('total', 0)
    .order('total', { ascending: false });
  if (data) {
    return data;
  } else {
    return null;
  }
};

export const fetchLastWeek = async (lastWeek: number) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('rank')
    .select()
    .eq('week', lastWeek)
    .not('total', 'is', null)
    .order('total', { ascending: false });
  if (data) {
    return data;
  } else {
    return null;
  }
};

export const fetchUserLastRank = async (userId: string | null | undefined, lastWeek: number) => {
  const supabase = createClient();
  const { data }: { data: Rank | null } = await supabase
    .from('rank')
    .select()
    .eq('user_id', userId)
    .eq('week', lastWeek)
    .single();
  if (data) {
    return data;
  } else {
    return null;
  }
};

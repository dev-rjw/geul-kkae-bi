'use server';

import { TotalScore } from '@/types/result';
import { createClient } from '../supabase/server';
import { Rank } from '@/types/rank';

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

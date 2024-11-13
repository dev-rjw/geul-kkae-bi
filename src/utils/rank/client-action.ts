import { createClient } from '../supabase/client';
import { addScoresProps } from '@/types/user';
import { weekNumber } from '@/utils/week/weekNumber';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export const weekCalculate = (beforeWeek: number) => {
  const standardDate: Date = new Date('2024-10-28');
  const todayDate: Date = new Date();

  let diff = Math.abs(standardDate.getTime() - todayDate.getTime());
  diff = Math.ceil(diff / ONE_WEEK);

  return diff + beforeWeek;
};

// 랭킹 가져오기
export const fetchUserRank = async (user_id: string, week: number) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('rank').select('*').eq('week', week).eq('user_id', user_id).single();

  if (error) {
    return { total: null, speaking: null, checking: null, writing: null };
  }

  return data;
};

export const fetchRankTop3 = async (week: number) => {
  const supabase = createClient();

  const { data } = await supabase
    .from('rank')
    .select(`*, user(nickname)`)
    .eq('week', week)
    .gte('total', 0)
    .order('total', { ascending: false })
    .limit(3);

  return data;
};

// 회원가입 시 rank 테이블에 정보 저장
export const addScores = async ({ userId, checking, speaking, writing }: addScoresProps) => {
  const supabase = createClient();
  const total = checking !== null && speaking !== null && writing !== null ? checking + speaking + writing : null;
  const week = weekNumber;

  const { error } = await supabase.from('rank').insert([{ user_id: userId, checking, speaking, writing, total, week }]);

  if (typeof window !== 'undefined') {
    localStorage.removeItem('checking');
    localStorage.removeItem('speaking');
    localStorage.removeItem('writing');
  }

  if (error) {
    return error;
  }
};

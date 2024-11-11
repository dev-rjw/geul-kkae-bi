import { createClient } from '../supabase/client';
import { addScoresProps } from '@/types/user';

// 랭킹 가져오기
export const fetchUserRank = async (user_id: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('rank').select('*').eq('user_id', user_id).single();

  return data;
};

// 랭킹 TOP 3
// TODO: week 2로 고정시키면 안됨
export const fetchRank3 = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from('rank')
    .select(`*, user(nickname)`)
    .eq('week', 2)
    .gte('total', 0)
    .order('total', { ascending: false })
    .limit(3);

  return data;
};

// 회원가입 시 rank 테이블에 정보 저장
export const addScores = async ({ userId, checking, speaking, writing }: addScoresProps) => {
  const supabase = createClient();
  const total = checking + speaking + writing;
  // week 계산
  const startSeason = new Date(2024, 9, 27);
  const now = new Date();
  const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;
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

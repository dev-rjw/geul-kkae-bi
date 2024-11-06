import Swal from 'sweetalert2';
import { createClient } from '../supabase/client';

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

type addScoresProps = {
  userId: string | null;
  checking: number | null;
  speaking: number | null;
  writing: number | null;
  total: number | null;
  week: number | null;
};

// 회원가입 시 rank테이블에 정보 저장
export const addScoresRank = async ({ userId, checking, speaking, writing, total, week }: addScoresProps) => {
  const supabase = createClient();
  const { error } = await supabase.from('rank').insert([{ user_id: userId, checking, speaking, writing, total, week }]);

  if (error) {
    Swal.fire('정보 저장에 실패했습니다.');
    return;
  }
};

import Swal from 'sweetalert2';
import { createClient } from '../supabase/client';

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

  const { data } = await supabase.from('rank').select('*').eq('week', week).eq('user_id', user_id).single();

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
    Swal.fire({
      html: `<div class="text-gray-700">정보 저장에 실패했습니다.</div>`,
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
      },
      confirmButtonText: '확인',
    });

    return;
  }
};

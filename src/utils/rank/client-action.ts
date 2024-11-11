import Swal from 'sweetalert2';
import { createClient } from '../supabase/client';

// 랭킹 가져오기
export const fetchUserRank = async (user_id: string, beforeWeek: number) => {
  const supabase = createClient();

  const standardDate: Date = new Date('2024-10-28');
  const todayDate: Date = new Date();

  let diff = Math.abs(standardDate.getTime() - todayDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  diff = Math.floor(diff / 7) + (diff % 7 === 0 ? 0 : 1);

  const { data } = await supabase
    .from('rank')
    .select('*')
    .eq('week', diff + beforeWeek)
    .eq('user_id', user_id)
    .single();

  return data;
};

export const fetchRankTop3 = async () => {
  const supabase = createClient();

  const standardDate: Date = new Date('2024-10-28');
  const todayDate: Date = new Date();

  // 기준 일자와 오늘 일자간 몇 주가 지났는지 계산
  let diff = Math.abs(standardDate.getTime() - todayDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  diff = Math.floor(diff / 7) + (diff % 7 === 0 ? 0 : 1);

  const { data } = await supabase
    .from('rank')
    .select(`*, user(nickname)`)
    .eq('week', diff)
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

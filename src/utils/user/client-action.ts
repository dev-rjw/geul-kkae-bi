import { User } from '@/app/mypage/page';
import { createClient } from '../supabase/client';

// 이메일 중복확인
export const checkEmailExists = async (email: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('user').select('email').eq('email', email);

  if (error) {
    return error;
  }

  return data && data.length > 0;
};

// 닉네임 중복확인
export const checkNicknameExists = async (nickname: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('user').select('nickname').eq('nickname', nickname);

  if (error) {
    return error;
  }

  return data && data.length > 0;
};

// 현재 사용자 정보 조회
export const fetchCurrentUserInfo = async (email: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('user').select('*').eq('email', email).single();

  return data as User;
};

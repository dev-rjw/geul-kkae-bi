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

// 프로필 사진 storage에 저장
export const saveProfile = async (image: File) => {
  const supabase = createClient();
  const time = new Date().getTime();
  await supabase.storage.from('profile').upload(time + '.jpg', image!);

  return time;
};

// 프로필 사진 storage에서 가져오기
export const fetchProfile = async (name: string) => {
  const supabase = createClient();
  const { data } = supabase.storage.from('profile').getPublicUrl(name + '.jpg');

  return data;
};

// 프로필 수정
export const updateUserInfo = async (
  userId: string,
  image: string | null,
  nickname: string,
  introduction: string | null,
) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('user')
    .update({
      image: image,
      nickname: nickname,
      introduction: introduction,
    })
    .eq('user_id', userId)
    .select();

  return data;
};

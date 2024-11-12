import { User } from '@supabase/supabase-js';
import { createClient } from '../supabase/server';
import { randomNickname } from '@/app/(sign)/utils/sign';

// 소셜 회원에 닉네임 추가
export const addNickname = async (userId: string) => {
  const supabase = createClient();
  let nickname;
  let isUnique = false;

  const { data } = await supabase.from('user').select('nickname').eq('user_id', userId).single();

  if (!data?.nickname) {
    while (!isUnique) {
      nickname = randomNickname();
      const { data, error } = await supabase.from('user').select('nickname').eq('nickname', nickname).single();

      // PGRST116 : 결과 없을 때 오류 코드
      if (error && error.code !== 'PGRST116') {
        console.error('닉네임 조회 중 오류:', error);
        return error;
      }

      if (!data?.nickname) {
        isUnique = true;
      }
    }

    const { error: updateError } = await supabase.from('user').update({ nickname }).eq('user_id', userId);

    if (updateError) {
      console.error('닉네임 저장 중 오류:', updateError);
      return updateError;
    }
  }
};

// 소셜 회원에 프로필 이미지 추가
export const addProfileImage = async (userId: string) => {
  const supabase = createClient();

  const { data } = await supabase.from('user').select('image').eq('user_id', userId).single();

  if (!data?.image) {
    const { error: updateError } = await supabase
      .from('user')
      .update({
        image: `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/profile/default_img.webp`,
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('프로필 이미지 저장 중 오류:', updateError);
      return updateError;
    }
  }
};

// 소셜 회원에 provider 추가
export const addProvider = async (user: User) => {
  const supabase = createClient();

  if (user && user.app_metadata.provider) {
    await supabase
      .from('user')
      .update({
        provider: user.app_metadata.provider,
      })
      .eq('user_id', user.id);
  }
};

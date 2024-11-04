import { createClient } from '../supabase/server';

// 임의의 닉네임을 생성
function randomNickname() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const nicknameLength = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
  let nickname = '';

  for (let i = 0; i < nicknameLength; i++) {
    nickname += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return nickname;
}

// 소셜 회원에 닉네임 추가
export const addNickname = async (userId: string) => {
  const supabase = createClient();
  let nickname;
  let isUnique = false;

  const { data } = await supabase.from('user').select('nickname').eq('user_id', userId).single();

  // 닉네임이 없으면
  if (!data?.nickname) {
    // 중복되지 않는 닉네임을 찾을 때까지 반복
    while (!isUnique) {
      nickname = randomNickname();
      const { data, error } = await supabase.from('user').select('nickname').eq('nickname', nickname).single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116은 결과가 없을 때의 오류 코드
        console.error('닉네임 조회 중 오류:', error);
        return error;
      }

      // 닉네임이 중복되지 않으면 유효성 확인 완료
      if (!data?.nickname) {
        isUnique = true;
      }
    }

    // 닉네임 저장
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

  // 프로필 이미지가 없으면
  if (!data?.image) {
    // 프로필 이미지 저장
    const { error: updateError } = await supabase
      .from('user')
      .update({ image: `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/profile/default_img.png` })
      .eq('user_id', userId);

    if (updateError) {
      console.error('프로필 이미지 저장 중 오류:', updateError);
      return updateError;
    }
  }
};

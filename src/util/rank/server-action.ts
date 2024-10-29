import { createClient } from '../supabase/server';

//로그인한 유저 아이디 가져오기
export const fetchUserId = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log('user', user);
  if (user) {
    return user.user?.id;
  } else {
    return null;
  }
};

//로그인한 유저 닉네임 가져오기
export const fetchUserNickName = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  console.log('user', user);
  if (user) {
    return user.user?.user_metadata.nickname;
  } else {
    return null;
  }
};

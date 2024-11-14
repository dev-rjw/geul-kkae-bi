'use server';

import { adminAuthClient } from '../supabase/admin';
import { createClient } from '../supabase/server';

// 현재 사용자 조회
export const fetchCurrentUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    return null;
  }
  return user;
};

// 로그인한 유저 아이디 가져오기
export const fetchUserId = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (user) {
    return user.user?.id;
  } else {
    return null;
  }
};

// 사용자 삭제
export const deleteUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { error } = await adminAuthClient.deleteUser(user.id);
    if (error) {
      console.error(error);
    }
  }
};


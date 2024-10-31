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
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

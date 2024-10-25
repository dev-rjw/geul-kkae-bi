import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from './client';

// 회원가입
export const signup = async (formData: SignUpWithPasswordCredentials) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(formData);

  if (error) {
    return error;
  }

  return data;
};

// 로그인
export const signin = async (formData: SignInWithPasswordCredentials) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return error;
  }

  return data;
};

// 로그인 세션 정보
export const fetchSessionData = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) {
    return error;
  }

  return data.session?.user;
};

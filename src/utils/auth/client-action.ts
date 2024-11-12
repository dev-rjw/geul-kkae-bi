import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import { getURL } from '@/app/(sign)/utils/sign';

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

// 구글 회원가입 및 로그인
export const googleSignin = async () => {
  const supabase = createClient();
  const redirectUrl = getURL();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${redirectUrl}auth/callback`,
    },
  });

  if (error) {
    return error;
  }
  return data;
};

// 카카오 회원가입 및 로그인
export const kakaoSignin = async () => {
  const supabase = createClient();
  const redirectUrl = getURL();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${redirectUrl}auth/callback`,
    },
  });

  if (error) {
    return error;
  }
  return data;
};

// 현재 사용자 조회
export const fetchCurrentUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }
  return user;
};

// 비밀번호 찾기(비밀번호 재설정 메일발송)
export const findPassword = async (email: string) => {
  const supabase = createClient();
  const redirectUrl = getURL();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${redirectUrl}change-password`,
  });

  if (error) {
    return error;
  }
  return data;
};

// 비밀번호 변경
export const changePassword = async (newPassword: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return error;
  }
  return data;
};

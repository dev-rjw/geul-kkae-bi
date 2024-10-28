import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

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
  /* 1단계: 사용자에게 이메일을 보내 비밀번호 재설정 토큰을 받으세요.
  이 이메일에는 사용자를 귀하의 애플리케이션으로 다시 보내는 링크가 포함되어 있습니다. */
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
  }

  alert('비밀번호 재설정 이메일이 전송되었습니다.');
  return data;
};

// 비밀번호 변경
export const changePassword = async () => {
  const supabase = createClient();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == 'PASSWORD_RECOVERY') {
      const newPassword = prompt('새로운 비밀번호를 무엇으로 하시겠어요?');
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      if (data) {
        alert('비밀번호가 성공적으로 업데이트되었습니다.');
      }
      if (error) {
        alert('비밀번호를 업데이트하는 중 오류가 발생했습니다.');
      }
    }
  });
};

import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';
import { translateErrorMessage } from '@/schemas/commonSchema';
import Swal from 'sweetalert2';
// import { redirect } from 'next/navigation';

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
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    Swal.fire({
      html: `<div class="text-gray-700">로그인에 실패하였습니다.</div>`,
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
      },
      confirmButtonText: '확인',
    });

    return error;
  }

  return data;
};

// 카카오 회원가입 및 로그인
export const kakaoSignin = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    Swal.fire({
      html: `<div class="text-gray-700">로그인에 실패하였습니다.</div>`,
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
      },
      confirmButtonText: '확인',
    });

    return error;
  }
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
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
  });

  if (error) {
    console.error(error);
  }

  Swal.fire({
    html: `<div class="text-gray-700">해당 이메일로 비밀번호 <br/>변경링크를 보내드렸어요!</div>`,
    customClass: {
      title: 'swal-custom-title',
      htmlContainer: 'swal-custom-text',
      confirmButton: 'swal-custom-button',
    },
    confirmButtonText: '확인',
  });

  return data;
};

// 비밀번호 변경
export const changePassword = async (newPassword: string) => {
  const supabase = createClient();

  /* 2단계: 사용자가 귀하의 애플리케이션으로 다시 리디렉션되면,
    사용자에게 비밀번호를 재설정하도록 요청하세요. */
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    Swal.fire({
      html: `<div class="text-gray-700">${translateErrorMessage(error.message)}</div>`,
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
      },
      confirmButtonText: '확인',
    });

    console.error(error.message);
    return false;
  }

  Swal.fire({
    html: `<div class="text-gray-700">비밀번호 변경 완료!</div>`,
    customClass: {
      title: 'swal-custom-title',
      htmlContainer: 'swal-custom-text',
      confirmButton: 'swal-custom-button',
    },
    confirmButtonText: '확인',
  });

  return true;
};

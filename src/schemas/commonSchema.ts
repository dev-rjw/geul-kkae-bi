import { z } from 'zod';

// 오류 메시지를 한국어로 변환
export const translateErrorMessage = (error: string): string => {
  const errorTranslations: { [key: string]: string } = {
    'Invalid login credentials': '로그인 정보가 올바르지 않습니다.',
    'Email already in use': '이미 사용 중인 이메일입니다.',
    'Password is too weak': '비밀번호가 너무 약합니다.',
    'New password should be different from the old password.': '새로운 비밀번호는 이전 비밀번호와 달라야 합니다.',
  };

  return errorTranslations[error] || '알 수 없는 오류가 발생했습니다.';
};

export function getPasswordSchema() {
  return z
    .string()
    .refine((value) => value !== '', { message: '비밀번호를 입력해주세요.' })
    .refine((value) => value.length >= 8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .refine((value) => value.length <= 16, { message: '비밀번호는 16자리 이하이어야 합니다.' })
    .refine((value) => /[a-zA-Z]/.test(value), { message: '문자를 포함해야 합니다.' })
    .refine((value) => /\d/.test(value), { message: '숫자를 포함해야 합니다.' });
}

import { z } from 'zod';

// 오류 메시지를 한국어로 변환
export const translateErrorMessage = (error: string): string => {
  const errorTranslations: { [key: string]: string } = {
    'Invalid login credentials': '로그인 정보가 올바르지 않습니다.',
    'Email already in use': '이미 사용 중인 이메일입니다.',
    'Password is too weak': '비밀번호가 너무 약합니다.',
  };

  return errorTranslations[error] || '알 수 없는 오류가 발생했습니다.';
};

// 로그인
export const signinSchema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
    .max(16, '비밀번호는 16자리 이하이어야 합니다')
    .regex(/[a-zA-Z]/, { message: '문자를 포함해야 합니다' })
    .regex(/\d/, { message: '숫자를 포함해야 합니다' }),
});

// 회원가입
export const signupSchema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
    .max(16, '비밀번호는 16자리 이하이어야 합니다')
    .regex(/[a-zA-Z]/, { message: '문자를 포함해야 합니다' })
    .regex(/\d/, { message: '숫자를 포함해야 합니다' }),
  confirmPassword: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
    .max(100, '비밀번호는 100자리 이하이어야 합니다')
    .regex(/[a-zA-Z]/, { message: '문자를 포함해야 합니다' })
    .regex(/\d/, { message: '숫자를 포함해야 합니다' }),
  nickname: z
    .string()
    .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다' })
    .max(8, '닉네임은 8자리 이하이어야 합니다'),
});

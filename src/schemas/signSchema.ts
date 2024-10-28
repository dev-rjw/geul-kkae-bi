import { z } from 'zod';
import { checkEmailExists } from '@/util/user/client-action';

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
    .refine((value) => value !== '', { message: '비밀번호를 입력해주세요.' }) // 빈 문자열 체크
    .refine((value) => value.length >= 6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }) // 최소 길이 체크
    .refine((value) => value.length <= 16, { message: '비밀번호는 16자리 이하이어야 합니다.' }) // 최대 길이 체크
    .refine((value) => /[a-zA-Z]/.test(value), { message: '문자를 포함해야 합니다.' }) // 문자 포함 체크
    .refine((value) => /\d/.test(value), { message: '숫자를 포함해야 합니다.' }) // 숫자 포함 체크
    .refine((value) => /^[A-Za-z0-9]+$/.test(value), { message: '비밀번호에 특수 문자를 포함할 수 없습니다.' }), // 특수 문자 체크
});

// 회원가입
export const signupSchema = z
  .object({
    email: z
      .string()
      .email({ message: '이메일을 올바르게 입력해 주세요.' })
      .refine(
        async (email) => {
          const exists = await checkEmailExists(email);
          return !exists;
        },
        {
          message: '중복된 이메일입니다.',
        },
      ),
    password: z
      .string()
      .refine((value) => value !== '', { message: '비밀번호를 입력해주세요.' }) // 빈 문자열 체크
      .refine((value) => value.length >= 6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }) // 최소 길이 체크
      .refine((value) => value.length <= 16, { message: '비밀번호는 16자리 이하이어야 합니다.' }) // 최대 길이 체크
      .refine((value) => /[a-zA-Z]/.test(value), { message: '문자를 포함해야 합니다.' }) // 문자 포함 체크
      .refine((value) => /\d/.test(value), { message: '숫자를 포함해야 합니다.' }) // 숫자 포함 체크
      .refine((value) => /^[A-Za-z0-9]+$/.test(value), { message: '비밀번호에 특수 문자를 포함할 수 없습니다.' }), // 특수 문자 체크
    confirmPassword: z
      .string()
      .refine((value) => value !== '', { message: '비밀번호를 입력해주세요.' }) // 빈 문자열 체크
      .refine((value) => value.length >= 6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }) // 최소 길이 체크
      .refine((value) => value.length <= 16, { message: '비밀번호는 16자리 이하이어야 합니다.' }) // 최대 길이 체크
      .refine((value) => /[a-zA-Z]/.test(value), { message: '문자를 포함해야 합니다.' }) // 문자 포함 체크
      .refine((value) => /\d/.test(value), { message: '숫자를 포함해야 합니다.' }) // 숫자 포함 체크
      .refine((value) => /^[A-Za-z0-9]+$/.test(value), { message: '비밀번호에 특수 문자를 포함할 수 없습니다.' }), // 특수 문자 체크
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
      .max(8, '닉네임은 8자리 이하이어야 합니다.'),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: '이용약관에 동의해야 합니다.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

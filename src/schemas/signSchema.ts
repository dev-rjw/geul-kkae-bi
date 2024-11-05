import { checkEmailExists, checkNicknameExists } from '@/util/user/client-action';
import { z } from 'zod';
import { getPasswordSchema } from './commonSchema';

// 로그인
export const signinSchema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
  password: getPasswordSchema(),
  rememberedEmail: z.boolean().optional(), // 선택
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
        { message: '중복된 이메일입니다.' },
      ),
    password: getPasswordSchema(),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
      .max(8, '닉네임은 8자리 이하이어야 합니다.')
      .refine(
        async (nickname) => {
          const exists = await checkNicknameExists(nickname);
          return !exists;
        },
        { message: '중복된 닉네임입니다.' },
      ),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: '이용약관에 동의해야 합니다.',
    }),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

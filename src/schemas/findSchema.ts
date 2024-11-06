import { checkEmailExists } from '@/utils/user/client-action';
import { z } from 'zod';
import { getPasswordSchema } from './commonSchema';

// 비밀번호 찾기
export const findPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: '이메일을 올바르게 입력해 주세요.' })
    .refine(
      async (email) => {
        const exists = await checkEmailExists(email);
        return exists;
      },
      { message: '이메일이 존재하지 않습니다.' },
    ),
});

// 비밀번호 변경
export const changePasswordSchema = z
  .object({
    password: getPasswordSchema(),
    confirmPassword: z.string(),
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

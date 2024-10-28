import { checkEmailExists } from '@/util/user/client-action';
import { z } from 'zod';

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
export const changePasswordSchema = z.object({
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
});

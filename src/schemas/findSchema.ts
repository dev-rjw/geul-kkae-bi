import { z } from 'zod';

// 비밀번호 찾기
export const findSchema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),
});

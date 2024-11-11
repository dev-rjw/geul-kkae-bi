import { confirmNickname } from '@/utils/user/client-action';
import { z } from 'zod';

export const changeProfileSchema = (currentNickname: string) => z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
    .max(8, '닉네임은 8자리 이하이어야 합니다.')
    .refine(
      async (nickname) => {
        const exists = await confirmNickname(nickname, currentNickname);
          return !exists;
      },
      { message: '중복된 닉네임입니다.' },
    ),
  introduction: z.string().max(20, '한줄소개는 20자리 이하이어야 합니다.').optional(),
});

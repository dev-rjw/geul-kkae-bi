/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/util/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const upsertSpeekScore = async (score: { score: number; userId: string }) => {
  console.log(score);
  return await browserClient
    .from('rank')
    .upsert({
      user_id: score.userId,
      speaking: score.score,
      created_at: new Date(),
    })
    .select();
};
export const upsertMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: upsertSpeekScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speek'] });
    },
  });
};

/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/util/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addSpeekScore = async (score: { score: number; userId: string }) => {
  return await browserClient
    .from('rank')
    .insert({
      user_id: score.userId,
      speaking: score,
    })
    .select();
};
export const addSeekMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: addSpeekScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speek'] });
    },
  });
};

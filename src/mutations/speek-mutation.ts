/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const insertSpeekScore = async (score: { score: number; userId: string; weekNumber: number }) => {
  return await browserClient
    .from('rank')
    .insert({
      user_id: score.userId,
      speaking: score.score,
      created_at: new Date(),
      week: score.weekNumber,
    })
    .select();
};
export const useInsertMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertSpeekScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speek'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const updateSpeekScore = async (score: { score: number; userId: string; week: number }) => {
  return await browserClient
    .from('rank')
    .update({
      speaking: score.score,
    })
    .eq('user_id', score.userId)
    .eq('week', score.week);
};
export const useUpdateMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateSpeekScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speek'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const insertSpeekResult = async (result: { answer: string; userId: string; game: string; weekNumber: number }) => {
  return await browserClient
    .from('answer')
    .insert({
      user_id: result.userId,
      answer: result.answer,
      game: result.game,
      week: result.weekNumber,
    })
    .select();
};
export const useInsertResultMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertSpeekResult,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speekResult'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

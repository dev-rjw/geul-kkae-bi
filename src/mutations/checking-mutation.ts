/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const insertCheckingScore = async (score: { score: number; userId: string; weekNumber: number }) => {
  return await browserClient
    .from('rank')
    .insert({
      user_id: score.userId,
      checking: score.score,
      created_at: new Date(),
      week: score.weekNumber,
    })
    .select();
};

export const useInsertCheckingMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertCheckingScore,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['rank'] });
    },
    onError: (error) => {
      console.error('Error inserting writing score:', error);
    },
  });
};

const updateCheckingScore = async (score: { score: number; userId: string; week: number }) => {
  return await browserClient
    .from('rank')
    .update({
      checking: score.score,
    })
    .eq('user_id', score.userId)
    .eq('week', score.week);
};

export const useUpdateCheckingMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateCheckingScore,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['rank'] });
    },
    onError: (error) => {
      console.error('Error updating writing score:', error);
    },
  });
};

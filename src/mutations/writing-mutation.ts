/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const insertWritingScore = async (score: { score: number; userId: string; weekNumber: number }) => {
  return await browserClient
    .from('rank')
    .insert({
      user_id: score.userId,
      writing: score.score,
      created_at: new Date(),
      week: score.weekNumber,
    })
    .select();
};

export const useInsertWritingMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertWritingScore,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['rank'] });
    },
    onError: (error) => {
      console.error('Error inserting writing score:', error);
    },
  });
};

const updateWritingScore = async (score: { score: number; userId: string; week: number }) => {
  return await browserClient
    .from('rank')
    .update({
      writing: score.score,
    })
    .eq('user_id', score.userId)
    .eq('week', score.week);
};

export const useUpdateWritingMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateWritingScore,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['rank'] });
    },
    onError: (error) => {
      console.error('Error updating writing score:', error);
    },
  });
};

const insertWritingResult = async (answer: {
  userId: string;
  answer: string;
  question: string;
  game: string;
  week: number;
  consonant: string;
  meaning: string;
  useranswer: string;
}) => {
  const { data: existingData, error: fetchError } = await browserClient
    .from('answer')
    .select('*')
    .eq('user_id', answer.userId)
    .eq('question', answer.question)
    .eq('week', answer.week);

  if (fetchError) {
    throw new Error(`Error checking for duplicates: ${fetchError.message}`);
  }

  if (existingData && existingData.length > 0) {
    console.log('Duplicate entry found, skipping insertion.');
    return null;
  }

  const { data, error } = await browserClient
    .from('answer')
    .insert({
      user_id: answer.userId,
      answer: answer.answer,
      question: answer.question,
      game: answer.game,
      consonant: answer.consonant,
      week: answer.week,
      meaning: answer.meaning,
      user_answer: answer.useranswer,
    })
    .select();

  if (error) {
    throw new Error(`Error inserting data: ${error.message}`);
  }
  return data;
};

export const useInsertWritingResultMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertWritingResult,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['answer'] });
    },
    onError: (error) => {
      console.error('Error inserting writing answer:', error);
    },
  });
};

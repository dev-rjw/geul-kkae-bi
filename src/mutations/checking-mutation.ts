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
      console.error('Error inserting Checking score:', error);
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
      console.error('Error updating Checking score:', error);
    },
  });
};

const insertCheckingResult = async (answer: {
  userId: string;
  answer: string;
  question: string;
  game: string;
  week: number;
  correct: string[];
  meaning: string;
  useranswer: string | null;
}) => {
  const { data: existingData, error: fetchError } = await browserClient
    .from('answer')
    .select('*')
    .eq('user_id', answer.userId)
    .eq('question', answer.question)
    .eq('week', answer.week);

  if (fetchError) {
    throw new Error(`Error Checking for duplicates: ${fetchError.message}`);
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
      correct: answer.correct,
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

export const useInsertCheckingResultMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertCheckingResult,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['answer'] });
    },
    onError: (error) => {
      console.error('Error inserting Checking answer:', error);
    },
  });
};

const deleteSelectedAnswers = async (questions: string[], userId: string | null): Promise<void> => {
  if (!userId) {
    throw new Error('User ID is required for deletion.');
  }

  const { error } = await browserClient.from('answer').delete().in('question', questions).eq('user_id', userId);

  if (error) {
    throw new Error(`Error deleting answers: ${error.message}`);
  }
};

export const useDeleteCheckingAnswersMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (variables: { questions: string[]; userId: string }) =>
      deleteSelectedAnswers(variables.questions, variables.userId),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['CheckingWrongAnswer'] });
    },
  });
};

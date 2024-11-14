import { CheckingResult } from '@/types/checking';
import { create } from 'zustand';

type CheckingQuizStore = {
  results: CheckingResult[];
  addCheckingResults: (results: CheckingResult[]) => void;
};

export const useCheckingQuizStore = create<CheckingQuizStore>((set) => ({
  results: [],
  addCheckingResults: (results) =>
    set(() => ({
      results,
    })),
}));

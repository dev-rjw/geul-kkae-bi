import { PartialQuestion } from '@/types/writing';
import { create } from 'zustand';

type WritingQuizStore = {
  results: PartialQuestion[];
  addWritingResult: (newResult: PartialQuestion) => void;
};

export const useWritingQuizStore = create<WritingQuizStore>((set) => ({
  results: [],
  addWritingResult: (newResult) =>
    set((state) => ({
      results: [...state.results, newResult],
    })),
}));

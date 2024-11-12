import { PartialQuestion } from '@/types/writing';
import { create } from 'zustand';

type WritingQuizStore = {
  results: PartialQuestion[];
  addWritingResult: (allResult: PartialQuestion[]) => void;
};

export const useWritingQuizStore = create<WritingQuizStore>((set) => ({
  results: [],
  addWritingResult: (allResult) => set(() => ({ results: allResult })),
}));

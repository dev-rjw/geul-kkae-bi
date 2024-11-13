import { SpeekResult } from '@/types/speeking';
import { create } from 'zustand';

type SpeekStore = {
  result: SpeekResult[];
  setSpeekResult: (results: SpeekResult[]) => void;
};

export const useGameStore = create<SpeekStore>((set) => ({
  result: [],
  setSpeekResult: (results) => set(() => ({ result: results })),
}));

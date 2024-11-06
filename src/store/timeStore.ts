import { time } from 'console';
import { create } from 'zustand';

type time = {
  time: number;
  isDelay: boolean;
  setTimer: () => void;
  resetTimer: () => void;
  setIsDelay: (value: boolean) => void;
};

export const timeStore = create<time>((set) => ({
  time: 4,
  isDelay: false,
  // 상태 업데이트 함수
  setTimer: () => set((state) => ({ time: state.time - 1 })),
  resetTimer: () => set(() => ({ time: 4 })),
  setIsDelay: (value) => set(() => ({ isDelay: value })),
}));

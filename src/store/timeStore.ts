import { time } from 'console';
import { create } from 'zustand';

type time = {
  time: number;
  startTime: number;
  isDelay: boolean;
  setTimer: () => void;
  setStartTimer: () => void;
  setIsDelay: (value: boolean) => void;
};

export const timStore = create<time>((set) => ({
  time: 120,
  startTime: 3,
  isDelay: false,
  // 상태 업데이트 함수
  setTimer: () => set((state) => ({ time: state.time - 1 })),
  setStartTimer: () => set((state) => ({ startTime: state.startTime - 1 })),
  setIsDelay: (value) => set(() => ({ isDelay: value })),
}));

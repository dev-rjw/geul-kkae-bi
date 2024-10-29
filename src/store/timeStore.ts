import { time } from 'console';
import { create } from 'zustand';

type time = {
  time: number;
  setTimer: () => void;
};

export const timStore = create<time>((set) => ({
  time: 40,
  // 상태 업데이트 함수
  setTimer: () => set((state) => ({ time: state.time - 1 })),
}));

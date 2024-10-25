import { create } from 'zustand';

type speek = {
  index: number;
  percent: number;
  totlaPercent: number;
  incrementIndex: () => void;
  resetPercent: () => void;
  setPercent: (value: number) => void;
  addTotalPercent: (value: number) => void;
};

// Zustand 스토어 생성
const speekStore = create<speek>((set) => ({
  index: 0,
  percent: 0,
  totlaPercent: 0,

  // 상태 업데이트 함수
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  resetPercent: () => set(() => ({ percent: 0 })),
  setPercent: (value) => set(() => ({ percent: value })),
  addTotalPercent: (value) => set((state) => ({ totlaPercent: state.totlaPercent + value })),
}));

export default speekStore;

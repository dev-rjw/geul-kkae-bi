import { create } from 'zustand';

type speek = {
  index: number;
  percent: number;
  totlaPercent: number;
  text: string;
  isRecording: boolean;
  incrementIndex: () => void;
  resetPercent: () => void;
  setText: (text: string) => void;
  resetText: () => void;
  setPercent: (value: number) => void;
  addTotalPercent: (value: number) => void;
  setIsRecording: (value: boolean) => void;
};

const speekStore = create<speek>((set) => ({
  index: 0,
  percent: 0,
  totlaPercent: 0,
  text: '',
  isRecording: false,
  // 상태 업데이트 함수
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  resetPercent: () => set(() => ({ percent: 0 })),
  setText: (text) => set(() => ({ text })),
  resetText: () => set(() => ({ text: '' })),
  setPercent: (value) => set(() => ({ percent: value })),
  addTotalPercent: (value) => set((state) => ({ totlaPercent: state.totlaPercent + value })),
  setIsRecording: (value) => set(() => ({ isRecording: value })),
}));

export default speekStore;

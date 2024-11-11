import { create } from 'zustand';

type speek = {
  index: number;
  percent: number;
  totlaPercent: number;
  text: string;
  isRecording: boolean;
  isLoading: boolean;
  addIndex: () => void;
  resetIndex: () => void;
  resetPercent: () => void;
  setText: (text: string) => void;
  resetText: () => void;
  setPercent: (value: number) => void;
  addTotalPercent: (value: number) => void;
  setIsRecording: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
};

export const useSpeakStore = create<speek>((set) => ({
  index: 0,
  percent: 0,
  totlaPercent: 0,
  text: '',
  isRecording: false,
  time: 40,
  isLoading: false,
  // 상태 업데이트 함수
  addIndex: () => set((state) => ({ index: state.index + 1 })),
  resetIndex: () => set(() => ({ index: 0 })),
  resetPercent: () => set(() => ({ percent: 0 })),
  setText: (text) => set(() => ({ text })),
  resetText: () => set(() => ({ text: '' })),
  setPercent: (value) => set(() => ({ percent: value })),
  addTotalPercent: (value) => set((state) => ({ totlaPercent: state.totlaPercent + value })),
  setIsRecording: (value) => set(() => ({ isRecording: value })),
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));

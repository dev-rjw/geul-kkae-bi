export interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
  isMobile: boolean;
}

export type MobileTutorialProps = {
  onStartGame: () => void;
};

export type Question = {
  id: string;
  game_kind: string;
  question: string;
  test: string;
  answer: string;
  consonant: string;
  meaning: string;
  correct: string[];
  userAnswer: string;
  keyword: string;
  isCorrect: boolean;
};
export type PartialQuestion = Pick<Question, 'test' | 'meaning' | 'answer' | 'userAnswer' | 'keyword' | 'isCorrect'>;

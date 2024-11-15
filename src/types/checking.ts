export interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
  isMobile: boolean;
}

export interface QuestionUnderlineProps {
  question: string;
  correct: string[];
  selectedOption: string | null;
}

export interface CheckingButtonProps {
  correctOptions: string[];
  selectedOption: string | null;
  onselect: (option: string) => void;
}

export type CheckingQuestion = {
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

export type CheckingResult = {
  answer: string;
  test: string;
  option: string[];
  userAnswer: string | null;
  right: string;
  isCorrect: boolean;
};

export type MobileTutorialProps = {
  onStartGame: () => void;
};

export interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
  isMobile: boolean;
}

export interface QuestionUnderlineProps {
  question: string;
  correct: string[];
  selectedOption: string | null;
  isMobile: boolean;
}

export interface CheckingButtonProps {
  correctOptions: string[];
  selectedOption: string | null;
  onselect: (option: string) => void;
  isMobile: boolean;
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
  gameType: string;
};

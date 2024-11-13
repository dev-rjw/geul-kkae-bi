export interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
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

export type CheckingResult = {
  answer: string;
  test: string;
  option: string[];
  userAnswer: string | null;
  right: string;
  isCorrect: boolean;
};

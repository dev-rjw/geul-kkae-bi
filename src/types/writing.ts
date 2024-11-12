export type Question = {
  id: string;
  game_kind: string;
  question: string;
  answer: string;
  consonant: string;
  meaning: string;
  correct: string[] | null;
  userAnswer: string;
};
export type PartialQuestion = Pick<Question, 'question' | 'meaning' | 'answer' | 'userAnswer'>;

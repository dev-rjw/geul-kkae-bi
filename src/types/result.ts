export interface JustEndedGameProp {
  searchParams: { [key: string]: string | undefined };
}

export interface GamesScore {
  speakingScore: string | null;
  checkingScore: string | null;
  writingScore: string | null;
}

export interface GamesArray {
  type: string;
  score: string | null;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
}

export interface MatchedGameArray {
  type: string;
  score: string | number | null;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
}

export interface TotalScore {
  user_id: string;
  id: string;
  total: number;
}

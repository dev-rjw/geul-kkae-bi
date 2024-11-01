export interface JustEndedGameProp {
  searchParams: { [key: string]: string | undefined };
}

export interface UserTable {
  user_id: string;
  checking: number;
  speaking: number;
  writing: number;
  created_at: string;
  id: string;
}

export interface GamesScore {
  speakingScore: string | null;
  checkingScore: string | null;
  writingScore: string | null;
}

export interface GamesArray {
  type: string;
  score: string | null;
  color: string;
  name: string;
}

export interface RankingArray {
  user_id: string;
  checking: number;
  speaking: number;
  writing: number;
  created_at: string;
  id: string;
  total: number;
  week: number;
  ranking: number;
  user: { image: string; nickname: string; introduction: string };
}

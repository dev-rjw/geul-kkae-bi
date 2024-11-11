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
  color: string;
  name: string;
}

export interface RankIncludingUserInfo {
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

export interface Rank {
  user_id: string;
  checking: number;
  speaking: number;
  writing: number;
  created_at: string;
  id: string;
  total: number;
  week: number;
  ranking: number;
}

export interface matchedGameArrayForGuest {
  type: string;
  score: string | null;
  color: string;
  name: string;
}

export interface matchedGameArrayForUser {
  type: string;
  score: number | null;
  color: string;
  name: string;
}

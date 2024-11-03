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

//랭킹이랑 유저정보 모두 가지고 오는것들 나눠야함
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

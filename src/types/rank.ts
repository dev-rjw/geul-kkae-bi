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

export interface userProfile {
  user_id: string;
  nickname: string;
  introduction: string;
  image: string;
  created_at: string;
  email: string;
  provider: null;
}

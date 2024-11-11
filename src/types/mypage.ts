export type User = {
  user_id: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  email: string;
  provider: string | null;
  created_at: string;
};

export type Rank = {
  user_id: string;
  id: string;
  speaking: string | null;
  checking: string | null;
  writing: string | null;
  total: string | null;
  ranking: string | null;
  week: string;
  created_at: string;
};

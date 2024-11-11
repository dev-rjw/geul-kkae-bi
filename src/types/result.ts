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

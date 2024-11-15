import { MatchedGameArray } from '@/types/result';

export const highlightScoreForMatchedGame = (matchedGame: MatchedGameArray) => {
  switch (matchedGame.type) {
    case 'speaking':
      return 'bg-secondary-200';
    case 'checking':
      return 'bg-tertiary-p-200';
    case 'writing':
      return 'bg-tertiary-g-300';
    default:
      return '';
  }
};

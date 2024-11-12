import { MatchedGameArray } from '@/types/result';

export const highlightScoreForMatchedGame = (matchedGame: MatchedGameArray) => {
  switch (matchedGame.type) {
    case 'speaking':
      return 'bg-[#Fbd498]';
    case 'checking':
      return 'bg-[#BFA5ED]';
    case 'writing':
      return 'bg-[#7FE6CF]';
    default:
      return '';
  }
};

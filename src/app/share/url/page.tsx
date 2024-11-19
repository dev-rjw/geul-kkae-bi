import { ShareUrlProps } from '@/types/share';
// import ResultSide from '@/app/games/(result)/_components/ResultSide';
import ResultCard from '@/app/games/(result)/_components/ResultCard';
import { MatchedGameArray } from '@/types/result';

const ShareUrlPage = ({ searchParams }: ShareUrlProps) => {
  const gameKey = searchParams.key;
  const gameScore = searchParams.score ?? undefined;
  const nickname = searchParams.nickname;
  const GAME_DATA: MatchedGameArray[] = [
    {
      type: 'speaking',
      score: gameScore,
      name: '나야, 발음왕',
      backgroundColor: 'bg-[#FEEFD7] max-md:bg-[#FEEFD7]',
      titleColor1: 'text-secondary-700',
      titleColor2: 'text-secondary-600',
      lineColor: 'bg-secondary-200',
    },
    {
      type: 'checking',
      score: gameScore,
      name: '틀린 말 탐정단',
      backgroundColor: 'bg-tertiary-p-100 max-md:bg-tertiary-p-100',
      titleColor1: 'text-tertiary-p-700',
      titleColor2: 'text-tertiary-p-400',
      lineColor: 'bg-tertiary-p-200',
    },
    {
      type: 'writing',
      score: gameScore,
      name: '빈칸 한입',
      backgroundColor: 'bg-tertiary-g-100 max-md:bg-tertiary-g-100',
      titleColor1: 'text-tertiary-g-800',
      titleColor2: 'text-tertiary-g-600',
      lineColor: 'bg-tertiary-g-200',
    },
  ];
  const matchedGame = gameKey ? GAME_DATA.find((game) => game.type === gameKey) : undefined;

  return (
    <div className='container'>
      <ResultCard
        matchedGame={matchedGame}
        GameScore={gameScore}
        justEndedGame={gameKey}
        nickname={nickname}
      />
    </div>
  );
};

export default ShareUrlPage;

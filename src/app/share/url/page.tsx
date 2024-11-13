import { GameData, ShareUrlProps } from '@/types/share';
import ResultSide from '@/app/games/(result)/_components/ResultSide';

const GAME_DATA: { [key: string]: GameData } = {
  speaking: {
    name: '나야, 발음왕',
    type: 'speaking',
    styles: {
      color: 'bg-secondary-100',
      highlightScoreColor: 'bg-secondary-200',
    },
  },
  checking: {
    name: '틀린 말 탐정단',
    type: 'checking',
    styles: {
      color: 'bg-tertiary-p-100',
      highlightScoreColor: 'bg-tertiary-p-200',
    },
  },
  writing: {
    name: '빈칸 한입',
    type: 'writing',
    styles: {
      color: 'bg-tertiary-g-100',
      highlightScoreColor: 'bg-tertiary-g-300',
    },
  },
};

const ShareUrlPage = ({ searchParams }: ShareUrlProps) => {
  const gameKey = searchParams.key;
  const gameScore = searchParams.score;
  const nickname = searchParams.nickname;

  // gameKey에 맞는 `matchedGame` 데이터 가져오기
  const matchedGame = gameKey ? GAME_DATA[gameKey] : undefined;

  console.log(gameKey);

  return (
    <div>
      <div className='flex justify-center pt-7 pb-[1.875rem] '>
        <div className='title-32 inline  relative'>
          {matchedGame?.name} 결과
          <div className={`h-5 ${matchedGame?.styles.color} absolute w-full -bottom-1 -z-10`} />
        </div>
      </div>

      <div className='flex flex-row justify-center h-[36.5rem]'>
        <div className={`flex w-[49.5rem] rounded-[1.25rem] ${matchedGame?.styles.color} `}>
          <ResultSide
            GameScore={gameScore}
            justEndedGame={'checking'}
          />
          <div className='flex flex-col items-center text-center pl-[2.929rem] pt-[7.5rem] '>
            <div className={`${matchedGame?.type} `}>
              <span className='title-20 text-primary-500'>{nickname}</span>
              <span className='query body-16 '>님의</span>
              <div className='query title-32'>국어 문해력은?</div>
            </div>
            <div className={`${matchedGame?.type} title-72 h-[6.813rem] pt-[1.219rem] inline relative`}>
              <span className='score relative z-20'>{gameScore}점</span>
              <div
                className={`h-[2.688rem] absolute w-full -bottom-5 z-10 ${matchedGame?.styles.highlightScoreColor}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareUrlPage;

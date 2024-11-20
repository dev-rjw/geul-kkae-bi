import Image from 'next/image';

type GameInfo = {
  GameScore: string | undefined;
  justEndedGame: string | undefined;
};

const getScoreImage = (score: number) => {
  if (score >= 90) {
    return { image: '/score_90.svg', text: '세종이 무덤에서 잘했다고 박수쳐줌' };
  } else if (score >= 60) {
    return { image: '/score_60.svg', text: '곧 1개국어 하실듯ㅋ' };
  } else if (score >= 30) {
    return { image: '/score_30.svg', text: '지나가던 서당개도 비웃을 실력' };
  } else if (score >= 0) {
    return { image: '/score_0.svg', text: '혹시..외국인?' };
  } else {
    return { image: '/score_0.svg', text: '혹시..외국인?' };
  }
};

const getScoreGame = (justEndedGame: string) => {
  if (justEndedGame === 'speaking') {
    return 'speak';
  } else if (justEndedGame === 'checking') {
    return 'check';
  } else if (justEndedGame === 'writing') {
    return 'write';
  } else {
    return '';
  }
};

const ResultSide = ({ GameScore, justEndedGame }: GameInfo) => {
  GameScore = GameScore ?? '0';
  justEndedGame = justEndedGame ?? '';

  const score = parseInt(GameScore);

  const { image, text } = getScoreImage(score);

  return (
    <div
      className={`${getScoreGame(
        justEndedGame,
      )} flex items-center w-[31.5rem] rounded-l-[1.25rem] rounded-r-[3rem] max-md:w-full max-md:rounded-t-none max-md:rounded-b-2xl`}
    >
      <div className='px-[2.875rem] py-9 max-md:w-full max-md:px-4 max-md:pt-8 max-md:pb-9'>
        <h3 className='text-center title-20 max-md:text-xs'>작품명</h3>
        <p className='result-text text-center title-24 max-md:text-sm max-md:mt-[0.125rem]'>{text}</p>
        <div className='game-image-box'>
          <div className='relative flex items-center w-[24.75rem] aspect-[396/260] rounded-xl overflow-hidden max-md:w-full'>
            <Image
              src={image}
              alt='점수에 맞는 이미지'
              fill
              sizes='100%'
              className='object-cover'
              priority
            />
          </div>
        </div>
        <div className='bg-white rounded-full p-2 mt-[3.063rem] max-md:mt-[2.375rem]'>
          <div
            className={`progress-bar progress-bar-${score}`}
            style={{ '--target-width': `${score}%` } as React.CSSProperties}
          >
            <div className='progress absolute top-1/2 right-0 translate-y-[-50%]'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSide;

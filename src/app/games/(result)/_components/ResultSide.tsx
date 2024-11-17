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
    <div className={`w-[504px] rounded-l-[1.25rem] rounded-r-[3rem] ${getScoreGame(justEndedGame)}`}>
      <div className='max-w-[402px] mt-9 mx-auto'>
        <h3 className='text-center title-20'>작품명</h3>
        <p className='txt text-center title-24'>{text}</p>
        <div className='game-image-box rounded-[18px] relative border-8 border-solid inline-block mt-8'>
          <Image
            width={396}
            height={272}
            src={image}
            alt='점수에 맞는 이미지'
          />
        </div>
        <div className='bg-white rounded-[90px] px-2.5 py-2 mt-[3.063rem]'>
          <div
            className='progress-bar relative h-11 rounded-[90px] transition-all ease-linear'
            style={{ width: `${score}%`, transitionDuration: '1s' }}
          >
            <div className='progress absolute top-1/2 right-0 translate-y-[-50%]'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSide;

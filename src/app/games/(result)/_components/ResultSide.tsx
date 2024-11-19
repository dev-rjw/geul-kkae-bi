import Image from 'next/image';

type gameInfo = {
  GameScore: string | undefined;
  justEndedGame: string | undefined;
};

const ResultSide = ({ GameScore, justEndedGame }: gameInfo) => {
  GameScore = GameScore ?? '0';
  justEndedGame = justEndedGame ?? '';

  const score = parseInt(GameScore);
  const scoreImage = (score: number) => {
    switch (true) {
      case score >= 90:
        return { image: '/score_90.svg', text: '세종이 무덤에서 잘했다고 박수쳐줌' };
      case score >= 60:
        return { image: '/score_60.svg', text: '곧 1개국어 하실듯ㅋ' };
      case score >= 30:
        return { image: '/score_30.svg', text: '지나가던 서당개도 비웃을 실력' };
      case score >= 0:
        return { image: '/score_0.svg', text: '혹시..외국인?' };
      default:
        return { image: '/score_0.svg', text: '혹시..외국인?' };
    }
  };
  const game = (justEndedGame: string) => {
    switch (justEndedGame) {
      case 'speaking':
        return 'speak';
      case 'checking':
        return 'check';
      case 'writing':
        return 'write';
      default:
        return '';
    }
  };
  const { image, text } = scoreImage(score);

  return (
    <div className={`${game(justEndedGame)} flex items-center w-[31.5rem] rounded-l-[1.25rem] rounded-r-[3rem] max-md:w-full max-md:rounded-none`}>
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
            />
          </div>
        </div>
        <div className='bg-white rounded-full p-2 mt-[3.063rem] max-md:mt-[2.375rem]'>
          <div
            className='progress-bar'
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

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
    switch (true) {
      case justEndedGame === 'speaking':
        return 'speak';
      case justEndedGame === 'checking':
        return 'check';
      case justEndedGame === 'writing':
        return 'write';
      default:
        return '';
    }
  };
  const { image, text } = scoreImage(score);

  return (
    <div className={`w-[504px] rounded-l-[1.25rem] rounded-r-[3rem] ${game(justEndedGame)}`}>
      <div className='max-w-[402px] mt-9 mx-auto'>
        <h3 className='text-center title-20'>작품명</h3>
        <p className='txt text-center title-24'>{text}</p>
        <div className='game_image_box rounded-[18px] relative border-8 border-solid inline-block mt-8'>
          <Image
            width={396}
            height={272}
            src={image}
            alt='점수에 맞는 이미지'
          />
        </div>
        <div className='bg-white rounded-[90px] px-2.5 py-2 mt-[3.063rem]'>
          <div
            className='progress_bar relative h-11 rounded-[90px] transition-all ease-linear'
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

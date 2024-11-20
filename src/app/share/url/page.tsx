import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShareUrlProps } from '@/types/share';
import { MatchedGameArray } from '@/types/result';
import { Button } from '@/components/ui/button';
import ResultCard from '@/app/games/(result)/_components/ResultCard';

export const metadata: Metadata = {
  title: '글깨비 - 결과공유',
  description: '내 문해력은 몇 점일지! 글깨비를 통해 내 문해력도 테스트 해보자!',
};

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
    <div className='container min-h-screen flex py-16 max-md:px-0 max-md:pt-[0.625rem] max-md:pb-4'>
      <div className='m-auto max-md:w-full max-md:my-0'>
        <div className='mb-[1.875rem] max-md:mb-[0.625rem]'>
          <Link
            href='/'
            className='relative flex items-center w-[16.375rem] aspect-[190/62] mx-auto max-md:w-[6.75rem]'
          >
            <Image
              src='/logo.svg'
              alt='글깨비'
              fill
              sizes='16.375rem'
              priority
            />
          </Link>
        </div>
        <div className='max-w-[49.5rem] mx-auto max-md:max-w-none'>
          <ResultCard
            matchedGame={matchedGame}
            GameScore={gameScore}
            justEndedGame={gameKey}
            nickname={nickname}
          />
        </div>
        <div className={`${matchedGame?.type} px-4 pt-[1.875rem] text-center max-md:pt-4`}>
          <div className='title-40 text-primary-500 max-md:text-[1.375rem]'>내 문해력은 몇 점일지!</div>
          <div className='title-24 text-gray-600 mt-2 max-md:text-sm max-md:mt-1'>
            글깨비를 통해 내 문해력도 테스트 해보자!
          </div>
          <div className='hidden max-md:block mt-4'>
            <Button
              asChild
              className='solid-button w-full max-w-[15rem]'
            >
              <Link href='https://www.geul-kkae-bi.com/'>나도 하러가기</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareUrlPage;

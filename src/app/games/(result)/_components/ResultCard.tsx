'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResultCardProps } from '@/types/result';
import LineTitle from '@/components/LineTitle';
import ResultSide from './ResultSide';
import kakaoTalkShare from './kakaoTalkShare';
import LinkCopyButton from './LinkCopyButton';
import Modal from './Modal';

const ResultCard = ({ matchedGame, GameScore, justEndedGame, nickname }: ResultCardProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`${matchedGame?.type} ${matchedGame?.backgroundColor} result-card flex grow rounded-[1.25rem] max-md:flex-col max-md:rounded-none`}
      >
        <ResultSide
          GameScore={GameScore}
          justEndedGame={justEndedGame}
        />

        <div className='relative flex flex-col items-center w-full text-center'>
          {pathname !== '/share/url' && (
            <Popover>
              <PopoverTrigger className='absolute top-4 right-4 flex items-center justify-center w-11 h-11 !rounded-2xl bg-transparent hover:bg-white/25 [&_svg]:size-[1.875rem]'>
                <Share className={`${matchedGame?.titleColor1}`} />
              </PopoverTrigger>
              <PopoverContent
                className='w-[16.125rem] rounded-[1.25rem] border-0 px-0 pt-0 pb-4 overflow-hidden'
                style={{ boxShadow: '0 0 4px rgba(0,0,0,0.25)' }}
              >
                <div className='body-18 text-center text-primary-500 p-4'>
                  결과페이지를
                  <br />
                  친구에게 공유해보세요!
                </div>
                <div className='h-1 bg-gray-100 border-t border-gray-200' />
                <div className='flex flex-col'>
                  <Button
                    className='flex items-center justify-start gap-2 h-11 text-lg font-bold text-gray-600 px-4 py-2 bg-transparent hover:bg-primary-50'
                    onClick={kakaoTalkShare}
                  >
                    <div className='relative aspect-square w-7 rounded-full'>
                      <Image
                        src={`/icon_kakao@2x.png`}
                        alt='카카오 아이콘'
                        fill
                        className='object-fill'
                      />
                    </div>
                    카카오톡으로 공유하기
                  </Button>
                  <LinkCopyButton
                    url={`https://geul-kkae-bi.vercel.app/share/url?key=${justEndedGame}&score=${GameScore}&nickname=${nickname}`}
                  />
                </div>
              </PopoverContent>
            </Popover>
          )}
          <div className='pt-[8.5rem]'>
            <div className={`${matchedGame?.titleColor1} mb-11`}>
              <span className='title-20 text-primary-500'>{nickname}</span>
              <span className='query body-16'>님의</span>
              <div className='query title-32 mt-[0.125rem]'>국어 문해력은?</div>
            </div>
            <LineTitle
              className={`title-72 font-normal ${matchedGame?.titleColor1}`}
              lineClassName={`!-bottom-1.5 !w-[calc(100%+12px)] h-4/6 ${matchedGame?.lineColor}`}
            >
              {GameScore}점
            </LineTitle>
            {pathname !== '/share/url' && (
              <div className='flex gap-5 mt-32'>
                <Button className='solid-light-button min-w-[6.75rem]'>
                  <Modal />
                </Button>
                <Button
                  asChild
                  className='solid-button min-w-[6.75rem]'
                >
                  <Link href={`/games/${matchedGame?.type}`}>재도전</Link>
                </Button>
              </div>
            )}
            {pathname === '/share/url' && (
              <div className='mt-28'>
                <Button asChild>
                  <Link href='https://geul-kkae-bi.vercel.app/'>나도 하러가기</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultCard;

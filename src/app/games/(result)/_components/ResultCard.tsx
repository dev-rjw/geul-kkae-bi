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

const ResultCard = ({ matchedGame, GameScore, justEndedGame, nickname }: ResultCardProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`result-card ${matchedGame?.type} ${matchedGame?.backgroundColor} flex grow rounded-[1.25rem] max-md:flex-col max-md:rounded-t-none max-md:rounded-b-2xl`}
      >
        <ResultSide
          GameScore={GameScore}
          justEndedGame={justEndedGame}
        />

        <div className='relative flex flex-col items-center w-full text-center'>
          {pathname !== '/share/url' && (
            <Popover>
              <PopoverTrigger className='max-md:hidden absolute top-4 right-4 flex items-center justify-center w-11 h-11 !rounded-2xl bg-transparent hover:bg-white/25 [&_svg]:size-[1.875rem]'>
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
                    className='flex items-center justify-start gap-2 h-11 text-lg font-bold text-gray-600 px-4 py-2 rounded-none bg-transparent hover:bg-primary-50'
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
          <div className='w-full px-6 pt-[8.5rem] max-md:px-4 max-md:pt-[1.625rem] max-md:pb-[1.125rem]'>
            <div className='max-md:flex max-md:items-center max-md:justify-between'>
              <div className={`${matchedGame?.titleColor1} mb-11 max-md:mb-0 max-md:pl-3 max-md:text-left`}>
                <span className='title-20 text-primary-500 max-md:text-sm'>{nickname}</span>
                <span className='query body-16 max-md:text-xs'>{nickname === '당신' ? '의' : '님의'}</span>
                <div className='query title-32 mt-[0.125rem] max-md:text-xl'>국어 문해력은?</div>
              </div>
              <LineTitle
                className={`title-72 font-normal max-md:title-56 max-md:mr-3 ${matchedGame?.titleColor1}`}
                lineClassName={`!-bottom-1.5 !w-[calc(100%+0.75rem)] h-3/6 max-md:!bottom-0 ${matchedGame?.lineColor}`}
              >
                {GameScore}점
              </LineTitle>
            </div>
            {pathname !== '/share/url' && (
              <div className='solid-button-group'>
                <Button className='solid-light-button min-w-[6.75rem] max-md:w-full'>오답확인</Button>
                <Button
                  asChild
                  className='solid-button min-w-[6.75rem] max-md:w-full'
                >
                  <Link href={`/games/${matchedGame?.type}`}>재도전</Link>
                </Button>
                <div className='solid-screw-group'>
                  <span className='solid-screw' />
                  <span className='solid-screw' />
                  <span className='solid-screw' />
                  <span className='solid-screw' />
                </div>
              </div>
            )}
            {pathname === '/share/url' && (
              <div className='mt-28 max-md:hidden'>
                <Button asChild className='solid-button w-full'>
                  <Link href='https://geul-kkae-bi.vercel.app/'>나도 하러가기</Link>
                </Button>
              </div>
            )}
            {/* <Modal /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultCard;

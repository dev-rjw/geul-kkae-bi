import Link from 'next/link';
import React from 'react';

interface unMatchedGamesProp {
  type: string;
  score: number;
  name: string;
  backgroundColor: string;
  titleColor1: string;
  titleColor2: string;
  lineColor: string;
}

const StatusCard = ({ unMatchedGames }: { unMatchedGames: unMatchedGamesProp[] | undefined }) => {
  return (
    <div className='flex flex-col justify-between w-[17.625rem] gap-[0.625rem] max-lg:flex-row max-lg:w-full max-md:px-4 max-md:pb-5 max-md:gap-4'>
      {unMatchedGames?.map((game) => {
        return (
          <Link
            key={game.type}
            href={`/games/${game.type}`}
            className={`game ${game.type} next-game-card h-full rounded-[1.25rem] max-lg:w-full max-md:h-[11.25rem] max-md:rounded-2xl`}
          >
            <div className='flex flex-col h-full p-6 max-md:px-3 max-md:py-[0.875rem]'>
              <div className='pb-5'>
                <div className='title-32 max-md:text-xl'>{game.name}</div>
                {game.score === null ? (
                  <div className='title-24 max-md:text-sm'>하러가기</div>
                ) : (
                  <div className='flex title-24 gap-1 max-md:text-sm'>
                    <div>
                      <span className='point'>현재 스코어: </span>
                      {game.score}점
                    </div>
                  </div>
                )}
              </div>
              <div className='flex items-center justify-center w-12 h-12 rounded-full bg-current mt-auto max-md:w-10 max-md:h-10'>
                <div className='icon-play text-white' />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default StatusCard;

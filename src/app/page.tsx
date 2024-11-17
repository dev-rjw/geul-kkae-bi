import * as React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';
import LineTitle from '@/components/LineTitle';
import GameCards from './_components/GameCards';
import MainCarousel from './_components/MainCarousel';
import MainRank from './_components/MainRank';
import MainGreeting from './_components/MainGreeting';

export default function Home() {
  return (
    <>
      <div className='container pt-11 max-md:pt-5'>
        <MainGreeting />

        <GameCards />

        <div className='grid grid-cols-3 gap-4 mt-4 max-lg:flex max-lg:flex-col max-lg:gap-7 max-lg:mt-7'>
          <div className='col-span-2'>
            <div className='hidden max-lg:flex text-xl mb-[0.875rem]'>
              <LineTitle
                className='text-primary-400'
                lineClassName='bg-primary-100'
              >
                ABOUT
              </LineTitle>
            </div>
            <MainCarousel />
          </div>

          <div>
            <div className='hidden max-lg:flex items-center justify-between text-xl mb-[0.875rem]'>
              <LineTitle
                className='text-primary-400'
                lineClassName='bg-primary-100'
              >
                RANKING
              </LineTitle>
              <Link
                className='inline-flex items-center text-sm font-bold text-gray-500'
                href='/games/rank'
              >
                전체보기
                <ChevronRight className='w-4 h-4 text-gray-600' />
              </Link>
            </div>
            <MainRank />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

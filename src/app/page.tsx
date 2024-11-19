import * as React from 'react';
import Footer from '@/components/Footer';
import LineTitle from '@/components/LineTitle';
import GameCards from './_components/GameCards';
import MainCarousel from './_components/MainCarousel';
import MainRank from './_components/MainRank';
import MainGreeting from './_components/MainGreeting';
import MainRankViewAllButton from './_components/MainRankViewAllButton';

const Home = async () => {
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
              <MainRankViewAllButton />
            </div>
            <MainRank />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

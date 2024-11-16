import * as React from 'react';
import Footer from '@/components/Footer';
import GameCards from './_components/GameCards';
import MainCarousel from './_components/MainCarousel';
import MainRank from './_components/MainRank';

export default function Home() {
  return (
    <>
      <div className='container pt-11 max-md:pt-5'>
        <GameCards />
        <div className='grid grid-cols-3 gap-4 mt-4'>
          <MainCarousel />
          <MainRank />
        </div>
      </div>
      <Footer />
    </>
  );
}

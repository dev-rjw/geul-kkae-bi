'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MobileTutorialProps } from '@/types/checking';
import Image from 'next/image';

const MobileTutorial: React.FC<MobileTutorialProps> = ({ onStartGame }) => {
  return (
    <div className='fixed inset-0 z-50 bg-[#2f2f2f] flex justify-center items-center'>
      <Carousel className='relative w-full h-full'>
        <CarouselContent>
          <CarouselItem>
            <div className='relative w-full h-screen'>
              <Image
                src='/checking_mobile_tutorial1.svg'
                alt='Mobile_tutorial 1'
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className='relative w-full h-screen flex justify-center items-center'>
              <Image
                src='/checking_mobile_tutorial2.svg'
                alt='Mobile_tutorial 2'
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <button
                className='start_checking_btn absolute  top-[108px] w-[209px] py-[15px] rounded-[80px]'
                onClick={onStartGame}
              >
                <span className='relative z-10 title-20 text-tertiary-p-700'>GAME START</span>
              </button>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileTutorial;

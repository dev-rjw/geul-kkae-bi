'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MobileTutorialProps } from '@/types/writing';
import Image from 'next/image';

const MobileTutorial: React.FC<MobileTutorialProps> = ({ onStartGame }) => {
  return (
    <div className='fixed inset-0 z-50 bg-[#2f2f2f] flex justify-center items-center'>
      <Carousel className='relative w-full h-full'>
        <CarouselContent>
          <CarouselItem>
            <div className='relative w-full h-screen'>
              <Image
                src='/writing_mobile_tutorial1.svg'
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
                src='/writing_mobile_tutorial2.svg'
                alt='Mobile_tutorial 2'
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              <button
                onClick={onStartGame}
                className='start_writing_btn absolute w-[209px] py-[15px] rounded-[80px] bottom-[7.5rem]'
              >
                <span className='relative z-10 title-20 text-tertiary-g-800 text-shadow'>GAME START</span>
              </button>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MobileTutorial;

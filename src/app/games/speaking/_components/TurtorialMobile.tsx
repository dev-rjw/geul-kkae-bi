'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

type Delay = {
  handleStart: () => void;
};

const TurtorialMobile = ({ handleStart }: Delay) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className='w-full'
    >
      <CarouselContent>
        <CarouselItem>
          <Card className="bg-center bg-[#2F2F2F] h-screen bg-[url('/speak_mobile_tutorial1.svg')] bg-contain h-screen bg-no-repeat">
            <CardContent>
              <div></div>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="relative bg-center bg-[#2F2F2F] h-screen bg-[url('/speak_mobile_tutorial2.svg')] bg-contain h-screen bg-no-repeat">
            <CardContent>
              <span className='turtorial1'></span>
              <button
                onClick={handleStart}
                className='start_btn absolute bottom-[4.375rem] right-[62px] w-[13.063rem] py-[15px] rounded-[80px]'
              >
                <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
              </button>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default TurtorialMobile;

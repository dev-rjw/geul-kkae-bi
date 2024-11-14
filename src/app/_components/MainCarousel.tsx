'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';

const MainCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className='w-full col-span-2 relative rounded-[1.25rem] overflow-hidden'>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent>
          <CarouselItem>
            <Card
              className='px-[2.875rem] py-[3.125rem] rounded-[1.25rem] border-0 bg-primary-400 h-full min-h-[20.5rem] bg-cover bg-right-bottom'
              style={{ backgroundImage: `url('/main_carousel_image1.svg')` }}
            >
              <CardContent>
                <div className='mb-4'>
                  <Badge className='h-[1.875rem] text-sm font-bold rounded-md px-[0.625rem] py-0 bg-primary-500 text-primary-100 hover:bg-primary-500'>
                    서비스 소개
                  </Badge>
                </div>
                <div className='title-34 text-white'>글을 절로 깨치는 글깨비</div>
                <div className='body-16 text-primary-100 mt-3'>
                  낫 놓고 기역자도 모르는 <br />
                  무국적 한국인들을 위한 <br />
                  본격 성인 한글 공부 프로젝트
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card
              className='px-[2.875rem] py-[3.125rem] rounded-[1.25rem] border-0 bg-primary-400 h-full min-h-[20.5rem] bg-cover bg-right-bottom'
              style={{ backgroundImage: `url('/main_carousel_image2.svg')` }}
            >
              <CardContent>
                <div className='mb-4'>
                  <Badge className='h-[1.875rem] text-sm font-bold rounded-md px-[0.625rem] py-0 bg-primary-500 text-primary-100 hover:bg-primary-500'>
                    작업 배경
                  </Badge>
                </div>
                <div className='title-34 text-white'>우천시가 어디예요?</div>
                <div className='body-16 text-primary-100 mt-3'>
                  교육부& 국가평생교육진흥원 조사 결과 <br />
                  성인 100면 중 3명(146만명)은 <br />
                  &lsquo;초1수준&rsquo; 문해력을 갖고 있는 것으로 발표
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card
              className='px-[2.875rem] py-[3.125rem] rounded-[1.25rem] border-0 bg-primary-400 h-full min-h-[20.5rem] bg-cover bg-right-bottom'
              style={{ backgroundImage: `url('/main_carousel_image3.svg')` }}
            >
              <CardContent>
                <div className='mb-4'>
                  <Badge className='h-[1.875rem] text-sm font-bold rounded-md px-[0.625rem] py-0 bg-primary-500 text-primary-100 hover:bg-primary-500'>
                    핵심 기능 소개
                  </Badge>
                </div>
                <div className='title-34 text-white'>초등학교는 졸업하셨죠?</div>
                <div className='body-16 text-primary-100 mt-3'>
                  초딩 1학년보다는 낫다고 생각하시죠?
                  <br />
                  당신을 위해 준비한 문해력 끝판왕 <br />
                  3가지 테스트! 지금 바로 참여해보세요 :)
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className='absolute bottom-[3.125rem] left-[2.875rem] flex justify-center gap-[0.375rem]'>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-[0.875rem] h-[0.875rem] rounded-full border-2 border-primary-600 transition-all ${
              current === index ? 'bg-primary-600' : 'bg-transparent'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;

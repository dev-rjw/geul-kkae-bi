import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

type Delay = {
  handleStart: () => void;
};

const Tutorial = ({ handleStart }: Delay) => {
  return (
    <div className='w-full mx-auto bg-[#252424]'>
      <div className='hidden md:block h-screen tutorial-bg'>
        <button
          onClick={handleStart}
          className='start-btn absolute bottom-[4.375rem] right-[62px] w-[13.063rem] py-[15px] rounded-[80px]'
        >
          <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
        </button>
      </div>
      <Carousel className='w-full hidden max-md:block absolute top-0 left-0 h-screen z-50'>
        <CarouselContent>
          <CarouselItem>
            <Card className='h-screen mb-tutorial-bg max-md:h-screen rounded-none'>
              <CardContent>
                <div></div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='relative h-screen mb-tutorial-bg ty2 rounded-none'>
              <CardContent>
                <button
                  onClick={handleStart}
                  className='start-btn absolute top-[3.687rem] left-1/2 translate-x-[-50%] w-[13.063rem] py-[15px] rounded-[80px] '
                >
                  <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
                </button>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Tutorial;

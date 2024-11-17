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
          className='start_btn absolute bottom-[4.375rem] right-[62px] w-[13.063rem] py-[15px] rounded-[80px]'
        >
          <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
        </button>
      </div>
      <Carousel className='w-full hidden max-md:block'>
        <CarouselContent>
          <CarouselItem>
            <Card className='bg-[#2F2F2F] h-screen mb-tutorial-bg'>
              <CardContent>
                <div></div>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className='relative bg-[#2F2F2F] h-screen mb-tutorial-bg ty2'>
              <CardContent>
                <button
                  onClick={handleStart}
                  className='start_btn absolute top-[3.687rem] left-1/2 translate-x-[-50%] w-[13.063rem] py-[15px] rounded-[80px] '
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

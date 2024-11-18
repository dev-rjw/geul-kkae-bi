'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IconStar from '@/components/IconStar';
import IconChevronRight from '@/components/IconChevronRight';
import { GameCardProps } from '@/types/main';

const GameCard = ({ card, hoveredCard, selectedCard, onHover, onLeave, onClick }: Partial<GameCardProps>) => {
  const router = useRouter();

  return (
    <Card
      className={`game-card ${card?.styles.bg} ${hoveredCard === card?.id ? 'scale-105 shadow-lg' : ''} ${
        hoveredCard === null || hoveredCard === card?.id ? 'opacity-100' : 'opacity-50'
      } ${selectedCard === card?.id ? 'card-on' : ''}`}
      style={{ backgroundImage: `url(${card?.styles.bgImage})` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className='flex flex-col h-full'>
        <CardHeader className='p-0 mb-4'>
          <div className='flex justify-between mb-4 max-lg:mb-2'>
            <Badge
              className={`h-5 text-sm font-bold leading-3 rounded-sm px-[0.375rem] py-0 max-lg:text-xs ${card?.styles.badgeColor}`}
            >
              {card?.badge}
            </Badge>
            <div className='flex items-center gap-1.5'>
              <span className={`body-16 -mb-1 max-lg:text-xs ${card?.styles.difficultyTextColor}`}>난이도</span>
              <div className='flex items-center gap-0.5'>
                {card?.difficulty &&
                  Array.from({ length: card?.difficulty }, (_, index) => (
                    <IconStar
                      key={index}
                      className={`w-4 h-4 max-lg:w-[0.875rem] max-lg:h-[0.875rem] ${card?.styles.difficultyIconColor}`}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className={`title-34 max-lg:title-24 ${card?.styles.titleColor}`}>{card?.title}</div>
          <div className={`game-card-text ${card?.styles.contentColor}`}>
            {card?.description.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </CardHeader>
        <Button
          className={`group flex w-fit h-[3.125rem] text-white rounded-[0.5rem] gap-[1.125rem] mt-auto max-lg:h-[2rem] max-lg:gap-2 max-lg:px-3 max-lg:py-1 max-lg:rounded-sm ${card?.styles.buttonColor}`}
          onClick={() => router.push(`${card?.link}`)}
        >
          <span className='title-20 -mb-1 max-lg:text-base'>게임 하러 가기</span>
          <IconChevronRight className={`!h-4 transition-colors max-lg:!w-3 max-lg:!h-3 ${card?.styles.buttonIconColor}`} />
        </Button>
      </div>
    </Card>
  );
};

export default GameCard;

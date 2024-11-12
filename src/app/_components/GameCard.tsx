'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IconStar from '@/components/IconStar';
import IconChevronRight from '@/components/IconChevronRight';
import { GameCardProps } from '@/types/main';

const GameCard = ({ card, hoveredCard, onHover, onLeave }: GameCardProps) => {
  const router = useRouter();

  return (
    <Card
      key={card.id}
      className={`w-full min-h-[26.25rem] p-[2.375rem] border-0 rounded-[1.25rem] transition-all duration-500 bg-cover bg-right-bottom ${
        card.styles.bg
      } ${hoveredCard === card.id ? 'scale-105 shadow-lg' : 'opacity-50'} ${
        hoveredCard === null || hoveredCard === card.id ? 'opacity-100' : 'opacity-50'
      }`}
      style={{ backgroundImage: `url(${card.styles.bgImage})` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className='flex flex-col h-full'>
        <CardHeader className='p-0 mb-4'>
          <div className='flex justify-between mb-4'>
            <Badge
              className={`h-5 text-sm font-bold leading-3 rounded-sm px-[0.375rem] py-0 ${card.styles.badgeColor}`}
            >
              {card.badge}
            </Badge>
            <div className='flex items-center gap-1.5'>
              <span className={`body-16 -mb-1 ${card.styles.difficultyTextColor}`}>난이도</span>
              <div className='flex items-center gap-0.5'>
                {Array.from({ length: card.difficulty }, (_, index) => (
                  <IconStar
                    key={index}
                    className={`w-4 h-4 ${card.styles.difficultyIconColor}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={`title-34 ${card.styles.titleColor}`}>{card.title}</div>
          <div className={`mt-4 body-16 ${card.styles.contentColor}`}>
            {card.description.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </CardHeader>
        <Button
          className={`group w-fit h-[3.125rem] text-white rounded-[0.5rem] gap-[1.125rem] mt-auto ${card.styles.buttonColor}`}
          onClick={() => router.push(`${card.link}`)}
        >
          <span className='title-20 -mb-1'>게임 하러 가기</span>
          <IconChevronRight className={`!h-4 transition-colors ${card.styles.buttonIconColor}`} />
        </Button>
      </div>
    </Card>
  );
};

export default GameCard;

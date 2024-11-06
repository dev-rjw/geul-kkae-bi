'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IconStar from '@/components/IconStar';
import IconChevronRight from '@/components/IconChevronRight';

const GameCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const cardData = [
    {
      id: 1,
      badge: 'GAME 01',
      difficulty: 2,
      title: '나야, 발음왕',
      description: ['주어진 문장을 읽고 녹음하면', '점수가 매겨지는 게임입니다!', '시간 내에 정확한 발음 해보세요!'],
      link: '/games/speaking',
      bg: 'bg-secondary-300',
      bgImage: '/character_speaking_card.svg',
      badgeColor: 'text-secondary-100 bg-secondary-500 hover:bg-secondary-500',
      difficultyTextColor: 'text-secondary-600',
      difficultyIconColor: 'text-secondary-500',
      titleColor: 'text-secondary-700',
      contentColor: 'text-secondary-600',
      buttonColor: 'bg-secondary-500 hover:bg-secondary-700 hover:text-secondary-500',
      buttonIconColor: 'text-[#F6D3A0] group-hover:text-[#D69D44]',
    },
    {
      id: 2,
      badge: 'GAME 02',
      difficulty: 3,
      title: '틀린 말 탐정단',
      description: ['당신의 국어 지식을 뽐내보세요!', '문장에서 틀린 부분을 찾아', '선택하는 게임입니다!'],
      link: '/games/checking',
      bg: 'bg-tertiary-p-300',
      bgImage: '/character_checking_card.svg',
      badgeColor: 'text-tertiary-p-100 bg-tertiary-p-400 hover:bg-tertiary-p-400',
      difficultyTextColor: 'text-tertiary-p-500',
      difficultyIconColor: 'text-tertiary-p-400',
      titleColor: 'text-tertiary-p-600',
      contentColor: 'text-tertiary-p-500',
      buttonColor: 'bg-tertiary-p-400 hover:bg-[#4F21A6]  hover:text-tertiary-p-300',
      buttonIconColor: 'text-[#C1ABEB] group-hover:text-[#8860D2]',
    },
    {
      id: 3,
      badge: 'GAME 03',
      difficulty: 4,
      title: '빈칸 한 입',
      description: ['빈칸에 들어갈 알맞은', '말을 적어주세요!', '국어 마스터, 도전해봐요!'],
      link: '/games/writing',
      bg: 'bg-tertiary-g-500',
      bgImage: '/character_writing_card.svg',
      badgeColor: 'text-tertiary-g-200 bg-tertiary-g-600 hover:bg-tertiary-g-600',
      difficultyTextColor: 'text-tertiary-g-700',
      difficultyIconColor: 'text-tertiary-g-600',
      titleColor: 'text-tertiary-g-800',
      contentColor: 'text-tertiary-g-800',
      buttonColor: 'bg-tertiary-g-600 hover:bg-[#115546] hover:text-tertiary-g-600',
      buttonIconColor: 'text-[#BCE5DD] group-hover:text-[#22AE8F]',
    },
  ];

  return (
    <div className='flex gap-4'>
      {cardData.map(
        ({
          id,
          badge,
          difficulty,
          title,
          description,
          link,
          bg,
          bgImage,
          badgeColor,
          difficultyTextColor,
          difficultyIconColor,
          titleColor,
          contentColor,
          buttonColor,
          buttonIconColor,
        }) => (
          <Card
            key={id}
            className={`w-full min-h-[26.25rem] p-[2.375rem] border-0 rounded-[1.25rem] transition-all duration-500 bg-cover bg-right-bottom ${bg} 
                ${hoveredCard === id ? 'scale-105 shadow-lg' : 'opacity-50'}
                ${hoveredCard === null || hoveredCard === id ? 'opacity-100' : 'opacity-50'}`}
            style={{ backgroundImage: `url(${bgImage})` }}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className='flex flex-col h-full'>
              <CardHeader className='p-0 mb-4'>
                <div className='flex justify-between mb-4'>
                  <Badge className={`h-5 text-sm font-bold leading-3 rounded-sm px-[0.375rem] py-0 ${badgeColor}`}>
                    {badge}
                  </Badge>
                  <div className='flex items-center gap-1.5'>
                    <span className={`body-16 -mb-1 ${difficultyTextColor}`}>난이도</span>
                    <div className='flex items-center gap-0.5'>
                      {Array.from({ length: difficulty }, (_, index) => (
                        <IconStar
                          key={index}
                          className={`w-4 h-4 ${difficultyIconColor}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`title-34 ${titleColor}`}>{title}</div>
                <div className={`mt-4 body-16 ${contentColor}`}>
                  {description.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </CardHeader>
              <Button
                className={`group w-fit h-[3.125rem] text-white rounded-[0.5rem] gap-[1.125rem] mt-auto ${buttonColor}`}
                onClick={() => router.push(`${link}`)}
              >
                <span className='title-20 -mb-1'>게임 하러 가기</span>
                <IconChevronRight className={`!h-4 transition-colors ${buttonIconColor}`} />
              </Button>
            </div>
          </Card>
        ),
      )}
    </div>
  );
};

export default GameCards;

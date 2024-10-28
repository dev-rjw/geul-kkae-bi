'use client';
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

function GameCards() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardData = [
    {
      id: 1,
      bg: 'bg-[#F9BC5F]',
      title: '주어진 문장 읽기',
      description: [
        '이 게임은 주어진 문장을',
        '읽고 녹음하면 점수가',
        '매겨지는 게임입니다!',
        '주어진 시간 내에',
        '정확한 발음을 해보세요!',
      ],
    },
    {
      id: 2,
      bg: 'bg-[#A07BE5]',
      title: '틀린 것 맞추기',
      description: ['당신의 국어 지식을 뽐내보세요!', '문장에서 틀린 부분을 찾아', '선택하는 게임입니다!'],
    },
    {
      id: 3,
      bg: 'bg-[#2AD4AF]',
      title: '빈칸 채우기',
      description: ['빈칸에 들어갈 알맞은', '말을 적어주세요!', '많이 맞을수록 당신은 국어 마스터!'],
    },
  ];

  return (
    <div className='flex ml-[20%] mr-[20%] gap-4'>
      {cardData.map(({ id, bg, title, description }) => (
        <Card
          key={id}
          className={`w-[50%] h-80 p-4 transition-transform duration-300 ${bg} ${
            hoveredCard === id ? 'scale-105 shadow-lg' : 'opacity-50'
          }
          ${hoveredCard === null || hoveredCard === id ? 'opacity-100' : 'opacity-50'}`}
          onMouseEnter={() => setHoveredCard(id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className='flex flex-col h-full'>
            <CardHeader className='mb-4'>
              <CardTitle className='text-lg font-bold'>{title}</CardTitle>
              <CardDescription>
                {description.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
            <Button className='mt-auto btn'>게임 하러 가기 &gt;</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

const dummy = [
  {
    rank: 1,
    name: '가을엔 붕어빵',
    score: 90,
  },
  {
    rank: 2,
    name: '가을엔 붕어빵',
    score: 70,
  },
  {
    rank: 3,
    name: '가을엔 붕어빵',
    score: 60,
  },
];

// API 호출
const getRankList = async () => {
  // let { data: rank, error } = await supabase
  // .from('rank')
  // .select('*')

  return dummy;
};

export default function Home() {
  const [ranks, setRanks] = useState<any>([]);

  useEffect(() => {
    getRankList().then((data) => setRanks(data));
  }, []);

  return (
    <>
      <Header />
      <GameCards />
      <div className='flex ml-[20%] mr-[20%] mt-5 gap-4'>
        <Carousel className='flex-shrink-0 w-[62%]'>
          <CarouselContent>
            {Array.from({ length: 2 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className='p-1'>
                  <Card className='bg-[#357EE7] h-64'>
                    <CardContent>
                      <span>서비스 소개</span>
                      <CardTitle>글을 절로 깨치는 글깨비</CardTitle>
                      <p>문해력, 어휘력 자신 있으십니까?</p>
                      <p>낫 놓고 기역자도 모르는</p>
                      <p>무국적 한국인들을 위한</p>
                      <p>본격 성인 한글 공부 프로젝트</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-1' />
          <CarouselNext className='right-1' />
        </Carousel>
        <Card className='w-[30%]'>
          <CardHeader>
            <CardTitle>랭킹 TOP 3</CardTitle>
            <CardDescription>이번주의 랭킹을 확인하세요</CardDescription>
          </CardHeader>
          {ranks.map((rank) => {
            return (
              <p key={rank.name}>
                {rank.rank}위 {rank.name}
              </p>
            );
          })}
        </Card>
      </div>
      <Footer />
    </>
  );
}

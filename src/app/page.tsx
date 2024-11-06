'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import IconStar from '@/components/IconStar';
import { fetchRank3 } from '@/utils/rank/client-action';

function GameCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const cardData = [
    {
      id: 1,
      bg: 'bg-secondary-300',
      title: '나야, 발음왕',
      description: ['주어진 문장을 읽고 녹음하면', '점수가 매겨지는 게임입니다!', '시간 내에 정확한 발음 해보세요!'],
      link: '/games/speaking',
    },
    {
      id: 2,
      bg: 'bg-tertiary-p-300',
      title: '틀린 말 탐정단',
      description: ['당신의 국어 지식을 뽐내보세요!', '문장에서 틀린 부분을 찾아', '선택하는 게임입니다!'],
      link: '/games/checking',
    },
    {
      id: 3,
      bg: 'bg-tertiary-g-500',
      title: '빈칸 한 입',
      description: ['빈칸에 들어갈 알맞은', '말을 적어주세요!', '국어 마스터, 도전해봐요!'],
      link: '/games/writing',
    },
  ];

  return (
    <div className='flex gap-4'>
      {cardData.map(({ id, bg, title, description, link }) => (
        <Card
          key={id}
          className={`w-full min-h-[26.25rem] p-[2.375rem] border-0 rounded-[1.25rem] transition-transform duration-300 ${bg} 
          ${hoveredCard === id ? 'scale-105 shadow-lg' : 'opacity-50'}
          ${hoveredCard === null || hoveredCard === id ? 'opacity-100' : 'opacity-50'}`}
          onMouseEnter={() => setHoveredCard(id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className='flex flex-col h-full'>
            <CardHeader className='p-0 mb-4'>
              <div className='flex justify-between mb-4'>
                <Badge className='h-5 text-sm font-bold leading-3 rounded-sm px-[0.375rem] py-0 bg-secondary-500 text-secondary-100'>
                  GAME 01
                </Badge>
                <div className='flex items-center gap-1'>
                  <span className='body-16 text-secondary-600'>난이도</span>
                  <div className='flex items-center'>
                    <IconStar className='w-4 h-4 text-primary-500' />
                    <IconStar className='w-4 h-4 text-secondary-500' />
                  </div>
                </div>
              </div>
              <CardTitle className='text-[2.125rem] font-yangjin font-normal text-secondary-700'>{title}</CardTitle>
              <div className='mt-4 body-16 text-secondary-600'>
                {description.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </CardHeader>
            <Button
              className='mt-auto btn'
              onClick={() => router.push(`${link}`)}
            >
              게임 하러 가기 &gt;
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export type Rank = {
  user_id: string;
  id: string;
  speaking: string | null;
  checking: string | null;
  writing: string | null;
  total: string | null;
  ranking: string | null;
  week: string;
  created_at: string;
  user: {
    nickname: string;
  };
};

export default function Home() {
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    fetchRank3().then((elemant) => setRanks(elemant!));
  }, []);

  return (
    <>
      <Layout>
        <div className='container pt-11'>
          <GameCards />
          <div className='grid grid-cols-3 gap-4 mt-4'>
            <Carousel className='col-span-2'>
              <CarouselContent>
                {Array.from({ length: 2 }).map((_, index) => (
                  <CarouselItem key={`carousel_${index}`}>
                    <Card className='rounded-[1.25rem] border-0 bg-[#357EE7] h-64'>
                      <CardContent>
                        <span>서비스 소개</span>
                        <CardTitle>글을 절로 깨치는 글깨비</CardTitle>
                        <p>문해력, 어휘력 자신 있으십니까?</p>
                        <p>낫 놓고 기역자도 모르는</p>
                        <p>무국적 한국인들을 위한</p>
                        <p>본격 성인 한글 공부 프로젝트</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Card className='rounded-[1.25rem] border-0'>
              <CardHeader>
                <CardTitle>랭킹 TOP 3</CardTitle>
                <CardDescription>이번주의 랭킹을 확인하세요</CardDescription>
              </CardHeader>
              {ranks.map((rank, index) => {
                return (
                  <p key={rank.id}>
                    {index + 1}위 {rank.user.nickname} {rank.total}점
                  </p>
                );
              })}
            </Card>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

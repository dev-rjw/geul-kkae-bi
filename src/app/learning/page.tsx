import WordList from '@/mock/learning';
import React from 'react';
import WordCard from './_components/WordCard';
import { Word } from '@/types/learning';
import './style.css';
import Image from 'next/image';

export const revalidate = 86400;

let firstIndex = 0;

function get10Words(array: string[]) {
  const words = array.slice(firstIndex, firstIndex + 10);
  firstIndex = (firstIndex + 10) % array.length;
  return words;
}

const LearningPage = async () => {
  const key = process.env.KOREAN_DICTIONARY_API_KEY;

  const words = get10Words(WordList);

  const result = await Promise.all(
    words.map(async (word) => {
      try {
        const res = await fetch(
          `https://opendict.korean.go.kr/api/search?key=${key}&target_type=search&req_type=json&part=word&q=${word}&sort=dict&start=1&num=10&advanced=y`,
          {},
        );

        if (!res.ok) {
          throw new Error('Falied');
        }
        const data: Word = await res.json();
        const definition = data.channel.item[0].sense[0].definition || 'No definition found';
        const wordClass = data.channel.item[0].sense[0].pos || 'No word class found';
        return { word, wordClass, definition };
      } catch (error) {
        console.log('error', error);
        return { word, definition: 'Error fetching definition', wordClass: 'Unknown' };
      }
    }),
  );

  const date = new Date();
  const today = date.getFullYear() + `.` + (date.getMonth() + 1) + `.` + date.getDate();

  return (
    <div>
      <div className='flex justify-between px-[100px] pt-[24px] pb-[32px]'>
        <div className='flex'>
          <div className='text-[42px] flex items-center'>오늘의 학습 카드</div>
          <div className='relative flex items-center w-[5rem] aspect-[190/62] max-lg:w-[8.75rem]'>
            <Image
              src='/icon_cards_learning.svg'
              alt='학습 대제목 옆 아이콘'
              fill
              sizes='11.5rem'
            />
          </div>
        </div>
        <div className='flex items-end text-[24px]'>{today}</div>
      </div>
      <div className='flex flex-wrap gap-y-7 word-card px-[100px] justify-between '>
        {result.map((item, index) => (
          <div
            key={item.word}
            className={`nth-card-${index + 1}`}
          >
            <WordCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

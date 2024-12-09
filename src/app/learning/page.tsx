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
  const today = date.getFullYear() + `. ` + (date.getMonth() + 1) + `. ` + date.getDate();

  return (
    <div className='container pt-10 max-md:pt-4'>
      <div className='flex items-end justify-between max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-1'>
        <div className='flex items-end'>
          <div className='text-[2.625rem] font-yangjin text-primary-300 max-md:text-2xl'>
            <span className='text-primary-400'>오늘</span>의 <span className='text-primary-400'>학습</span>카드
          </div>
          <div className='relative flex items-center w-[4.5rem] aspect-[72/66] ml-[0.625rem] max-md:w-[2.625rem] max-md:ml-1'>
            <Image
              src='/icon_cards_learning.svg'
              alt='학습 대제목 옆 아이콘'
              fill
              sizes='4.5rem'
              priority
            />
          </div>
        </div>
        <div className='title-24 text-gray-600 max-md:title-14'>{today}</div>
      </div>
      <div className='h-2 border-t-4 border-primary-100 bg-[#E9F1FE] mt-3 mb-7 max-md:-mx-4 max-md:mt-3 max-md:mb-5' />

      <div className='word-card grid grid-cols-5 flex-wrap gap-x-[1.125rem] max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-y-7 max-md:gap-y-[1.375rem]'>
        {result.map((item, index) => (
          <div
            key={item.word}
            className={`nth-card nth-card-${index + 1}`}
          >
            <WordCard item={item} />
          </div>
        ))}
      </div>
      <div className='relative w-[153px] h-[14px] mx-auto mt-[22px] mb-[16px]'>
        <Image
          src='/copyright_text_learning.svg'
          alt='학습 대제목 옆 아이콘'
          fill
          sizes='0.81rem'
        />
      </div>
    </div>
  );
};

export default LearningPage;

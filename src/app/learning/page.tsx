import WordList from '@/mock/learning';
import React from 'react';
import WordCard from './_components/WordCard';
import { Word } from '@/types/learning';

export const revalidate = 86400;

let firstIndex = 0;

function get10Words(array: string[], index: number) {
  return array.slice(index, index + 10);
}

// function get10Words(array: string[]) {
//   const words = array.slice(firstIndex, firstIndex + 10);
//   firstIndex = (firstIndex + 10) % array.length;
//   return words;
// }

const LearningPage = async () => {
  const key = process.env.KOREAN_DICTIONARY_API_KEY;

  const words = get10Words(WordList, firstIndex);

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

  firstIndex = (firstIndex + 10) % WordList.length;

  const date = new Date();
  const today = date.getFullYear() + `.` + (date.getMonth() + 1) + `.` + date.getDate();

  return (
    <div>
      <div className='bg-teal-200 w-[1075px]'>
        <div>오늘의 학습 카드</div>
        <div>{today}</div>
      </div>
      <div className='flex flex-wrap gap-4'>
        {result.map((item) => (
          <WordCard
            key={item.word}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

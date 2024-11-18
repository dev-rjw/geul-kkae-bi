import WordList from '@/mock/learning';
import React from 'react';

interface Word {
  channel: {
    total: number;
    num: number;
    title: string;
    start: number;
    description: string;
    link: string;
    item: WordItem[];
    lastbuilddate: string;
  };
}
interface WordItem {
  word: string;
  sense: [
    {
      definition: string;
      link: string;
      sense_no: string;
      target_code: string;
      type: string;
      pos: string;
    },
  ];
}

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
  console.log('words', words);

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

  console.log('result', result);

  const date = new Date();
  const today = date.getFullYear() + `.` + (date.getMonth() + 1) + `.` + date.getDate();
  console.log('today', today);

  return (
    <div>
      <div>오늘의 학습 카드</div>
      <div>{today}</div>
      <div className='w- flex gap-4 overflow'>
        {result.map((item) => (
          <div
            className='w-48 h-80 bg-emerald-200'
            key={item.word}
          >
            <div>
              <div>{item.word}</div>
              <div>{item.wordClass}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

// 얘는 무슨 에러인지 텍스트로 찍어줌
// const text = await res.text();
// console.log('text', text);

//  const result = words.map((word)=>())
//   const [description, exam] = await Promise.all([fetchDescription(word), fetchExam(word)]);
//   // const word = description.channel.item[0].word;
//   const definition = description.channel.item[0].sense[0].definition;
//   const wordClass = description.channel.item[0].sense[0].pos;
//   const example = exam.channel.item[0].example;

//   return { word: word, wordClass: wordClass, definition: definition, example: example };

// async function getWord(words: string[]) {
//   const result = await Promise.all(
//     words.map(async (word) => {
//       const [description, exam] = await Promise.all([fetchDescription(word), fetchExam(word)]);
//       const definition = description.channel.item[0]?.sense[0]?.definition || 'No definition available';
//       const wordClass = description.channel.item[0]?.sense[0]?.pos || 'Unknown';
//       const example = exam.channel.item[0]?.example || 'No example available';

//       return { word, wordClass, definition, example };
//     }),
//   );
//   return result;
// }

// const wordCard = await getWord(words);
//   console.log('wordCard', wordCard);

// async function fetchDescription(word: string) {
//   const resForDescription = await fetch(
//     `https://opendict.korean.go.kr/api/search?key=${key}&target_type=search&req_type=json&part=word&q=${word}&sort=dict&start=1&num=10&advanced=y`,
//     {},
//   );

//   if (!resForDescription.ok) {
//     throw new Error('Falied');
//   }
//   const descriptionData: Description = await resForDescription.json();
//     const definition = descriptionData.channel.item[0].sense[0].definition;
//   const wordClass = descriptionData.channel.item[0].sense[0].pos;
//   return {};
// }

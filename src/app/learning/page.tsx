import React from 'react';

const LearningPage = async () => {
  const key = process.env.KOREAN_DICTIONARY_API_KEY;

  const res = await fetch(
    `https://stdict.korean.go.kr/api/search.do?key=${key}&type_search=search&req_type=json&q=윤슬`,
    {},
  );

  if (!res.ok) {
    throw new Error('Falid');
  }

  const data = await res.json();
  console.log('data', data);

  return <div>LearningPage</div>;
};

export default LearningPage;

// 얘는 무슨 에러인지 텍스트로 찍어줌
// const text = await res.text();
// console.log('text', text);

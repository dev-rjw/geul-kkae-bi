'use client';

import React, { useEffect } from 'react';

const ResultPageForGuest = () => {
  useEffect(() => {
    localStorage.setItem('speaking', '80');
    localStorage.setItem('checking', '70');
    localStorage.setItem('writing', '60');

    //로컬스토리지에서 키와 벨류 가져오기
    const speakingScore = localStorage.getItem('speaking');
    console.log('speakingScore', speakingScore);
    const checkingScore = localStorage.getItem('checking');
    console.log('checkingScore', checkingScore);
    const writingScore = localStorage.getItem('writing');
    console.log('writingScore', writingScore);
    //없으니깐 null 나옴
  }, []);

  return <div>ResultPageForGuest</div>;
};

export default ResultPageForGuest;

// 로컬 스토리지에서 key가 있으면
//그걸로 바로 화면 그려주면 됨
//회원가입시에 가지고 있는걸 그냥 판별해서 보여주는거임
//여기서 유저가 똑같은 게임 두번하면 전에 했던거에 업테이트되나 아니면 새로운 행이 하나더 만들어지나가 궁금

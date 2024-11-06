'use client';
import React from 'react';

const ConsonantCard = ({ consonants }: { consonants: string }) => {
  return (
    <div className='max-w-[511px] max-h-[168px] flex justify-center items-start my-[34px] gap-[11px] font-yangjin'>
      {consonants.split('').map((char, index) => {
        return (
          <div
            key={index}
            className=' w-[100px] h-[100px] flex flex-col justify-center items-center p-[10px] bg-[#F9EFDD]'
          >
            <span className='custom-char-style'>{char}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ConsonantCard;

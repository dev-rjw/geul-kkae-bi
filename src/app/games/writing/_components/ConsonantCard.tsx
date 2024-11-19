'use client';
import React from 'react';

const ConsonantCard = ({ consonants, isMobile }: { consonants: string; isMobile: boolean }) => {
  return (
    <div
      className={`${
        isMobile ? 'max-w-[100%] flex-wrap gap-4 my-4' : 'max-w-[511px] max-h-[168px] gap-[11px] my-[34px]'
      } flex justify-center items-start font-yangjin`}
    >
      {consonants.split('').map((char, index) => {
        return (
          <div
            key={index}
            className={`${
              isMobile ? 'w-[80px] h-[80px] p-[8px]' : 'w-[100px] h-[100px] p-[10px]'
            } flex flex-col justify-center items-center bg-[#F9EFDD]`}
          >
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} custom-char-style`}>{char}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ConsonantCard;

'use client';
import React from 'react';

const ConsonantCard = ({ consonants }: { consonants: string }) => {
  return (
    <div className='max-w-[511px] max-h-[168px] flex justify-center items-start my-[34px] gap-[11px] '>
      {consonants.split('').map((char, index) => {
        return (
          <div
            key={index}
            className=' w-[100px] h-[100px] flex items-center justify-center bg-[#F9EFDD] text-[56px] font-medium'
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default ConsonantCard;

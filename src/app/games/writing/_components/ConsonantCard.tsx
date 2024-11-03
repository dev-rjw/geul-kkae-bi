'use client';
import React from 'react';

const ConsonantCard = ({ consonants }: { consonants: string }) => {
  return (
    <div className='flex justify-center gap-3'>
      {consonants.split('').map((char, index) => {
        return (
          <div
            key={index}
            className='w-28 h-28 flex items-center justify-center bg-writing-cecibdary text-[62px] font-bold'
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default ConsonantCard;

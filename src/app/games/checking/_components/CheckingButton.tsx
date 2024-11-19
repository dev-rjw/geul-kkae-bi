import { CheckingButtonProps } from '@/types/checking';
import React from 'react';

const CheckingButton: React.FC<CheckingButtonProps> = ({ correctOptions, selectedOption, onselect, isMobile }) => {
  return (
    <div
      className={`flex flex-wrap ${
        isMobile ? 'gap-x-4 gap-y-4 max-w-full mt-[4.25rem]' : 'gap-x-8 gap-y-[1.8125rem] max-w-[39.5rem]'
      } justify-center mx-auto font-yangjin`}
    >
      {correctOptions.map((option: string) => (
        <button
          key={option}
          onClick={() => onselect(option)}
          className={`${
            isMobile ? 'w-[12rem] h-[4rem] text-lg' : 'w-[18.75rem] h-[6.25rem] text-[2.5rem]'
          } font-medium rounded-[1.25rem] ${selectedOption === option ? 'bg-[#A07BE5] text-white' : 'bg-white'}`}
        >
          <span className='relative inline-block'>{option}</span>
        </button>
      ))}
    </div>
  );
};

export default CheckingButton;

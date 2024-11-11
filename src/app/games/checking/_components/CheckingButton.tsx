import React from 'react';

interface CheckingButtonProps {
  correctOptions: string[];
  selectedOption: string | null;
  onselect: (option: string) => void;
}

const CheckingButton: React.FC<CheckingButtonProps> = ({ correctOptions, selectedOption, onselect }) => {
  return (
    <div className='flex flex-wrap gap-x-8 gap-y-[1.8125rem] justify-center max-w-[39.5rem] mx-auto font-yangjin'>
      {correctOptions.map((option: string) => (
        <button
          key={option}
          onClick={() => onselect(option)}
          className={`w-[18.75rem] h-[6.25rem] text-[2.5rem] font-medium rounded-[1.25rem] ${
            selectedOption === option ? 'bg-[#A07BE5] text-white' : 'bg-white'
          }`}
        >
          <span className='relative top-1 inline-block'>{option}</span>
        </button>
      ))}
    </div>
  );
};

export default CheckingButton;

'use client';
import React, { useState } from 'react';

import CheckingAnswer from './_components/CheckingAnswer';
import WritingAnswer from './_components/WritingAnswer';
import SpeakAnswer from './_components/SpeakAnswer';
import './style.css';

const WrongAnswerPage = () => {
  const [selectedTab, setSelectedTab] = useState('speaking');
  return (
    <div className='flex flex-col items-center mt-[30px]'>
      <div className='w-full max-w-[1080px] max-h-[719px] rounded-lg'>
        <div className='relative'>
          <div className='flex justify-start items-center'>
            <button
              className={`relative h-[51px] bg-center bg-no-repeat pt-2 ${
                selectedTab === 'speaking'
                  ? "bg-[url('/speaking_btn_wrong.svg')] bg-cover text-secondary-700 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                  : "bg-[url('/speaking_btnon_wrong.svg')] bg-contain text-[#e78f09] w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
              }`}
              onClick={() => setSelectedTab('speaking')}
            >
              <p className='font-normal'>나야, 발음왕</p>
            </button>
            <button
              className={`relative h-[51px] bg-center bg-no-repeat pt-2 ${
                selectedTab === 'checking'
                  ? "bg-[url('/checking_btn_wrong.svg')] bg-cover text-tertiary-p-600 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                  : "bg-[url('/checking_btnon_wrong.svg')] bg-contain text-tertiary-p-300 w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
              }`}
              onClick={() => setSelectedTab('checking')}
            >
              <p className='font-normal '>틀린말 탐정단</p>
            </button>
            <button
              className={`relative h-[51px] bg-center bg-no-repeat pt-2 ${
                selectedTab === 'writing'
                  ? "bg-[url('/writing_btn_wrong.svg')] bg-cover text-tertiary-g-800 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                  : "bg-[url('/writing_btnon_wrong.svg')] bg-contain text-tertiary-g-500 w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
              }`}
              onClick={() => setSelectedTab('writing')}
            >
              <p className='font-normal'>빈칸 한 입</p>
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          {selectedTab === 'speaking' && <SpeakAnswer />}
          {selectedTab === 'checking' && <CheckingAnswer />}
          {selectedTab === 'writing' && <WritingAnswer />}
        </div>
      </div>
    </div>
  );
};
export default WrongAnswerPage;

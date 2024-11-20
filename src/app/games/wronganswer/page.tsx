'use client';
import React, { useState } from 'react';

import CheckingAnswer from './_components/CheckingAnswer';
import WritingAnswer from './_components/WritingAnswer';
import SpeakAnswer from './_components/SpeakAnswer';
import './style.css';

const WrongAnswerPage = () => {
  const [selectedTab, setSelectedTab] = useState('checking');
  
  return (
    <div className='container py-10 max-lg:px-0 max-lg:pb-0 max-md:pt-4'>
      <div className='flex flex-col items-center'>
        <div className='w-full rounded-lg'>
          <div className='relative'>
            <div className='flex justify-start items-center'>
              <button
                className={`relative h-[51px] bg-center bg-no-repeat text-left pt-2 ${
                  selectedTab === 'speaking'
                    ? "bg-[url('/speaking_btn_wrong.svg')] bg-cover pl-[30px] max-md:pl-[20px] text-secondary-700 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                    : "bg-[url('/speaking_btnon_wrong.svg')] bg-contain pl-[40px] max-md:pl-[16px] text-[#e78f09] w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
                }`}
                onClick={() => setSelectedTab('speaking')}
              >
                <p className='font-normal'>나야, 발음왕</p>
              </button>
              <button
                className={`relative h-[51px] bg-center bg-no-repeat text-left pt-2 ${
                  selectedTab === 'checking'
                    ? "bg-[url('/checking_btn_wrong.svg')] bg-cover pl-[23px] max-md:pl-[16px] text-tertiary-p-600 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                    : "bg-[url('/checking_btnon_wrong.svg')] bg-contain pl-[32px] max-md:pl-[13px] text-tertiary-p-300 w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
                }`}
                onClick={() => setSelectedTab('checking')}
              >
                <p className='font-normal '>틀린말 탐정단</p>
              </button>
              <button
                className={`relative h-[51px] bg-center bg-no-repeat text-left pt-2 ${
                  selectedTab === 'writing'
                    ? "bg-[url('/writing_btn_wrong.svg')] bg-cover pl-[41px] max-md:pl-[30px] text-tertiary-g-800 w-[192px] h-[61px] title-24 max-md:h-[43px] max-md:w-[130px] max-md:title-16"
                    : "bg-[url('/writing_btnon_wrong.svg')] bg-contain pl-[50px] max-md:pl-[24px] text-tertiary-g-500 w-[183px] mt-2.5 title-20 max-md:h-[27px] max-md:w-[100px] max-md:mt-4 max-md:pt-0.5 max-md:text-[12px]"
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
    </div>
  );
};
export default WrongAnswerPage;

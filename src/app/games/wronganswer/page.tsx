'use client';
import React, { useState } from 'react';

import CheckingAnswer from './_components/CheckingAnswer';
import WritingAnswer from './_components/WritingAnswer';

const WrongAnswerPage = () => {
  const [selectedTab, setSelectedTab] = useState('checking');
  return (
    <div className='flex flex-col items-center mt-[30px]'>
      <div className='w-full max-w-[1080px] max-h-[719px] rounded-lg'>
        <div className='relative'>
          <div className='flex justify-start items-center'>
            <button
              className={`relative w-[192px] h-[60px] bg-center bg-no-repeat ${
                selectedTab === 'checking'
                  ? "bg-[url('/checking_btnon_wrong.svg')] bg-cover text-[#4f21a6]"
                  : "bg-[url('/checking_btn_wrong.svg')] bg-contain text-[#a07be5]"
              }`}
              onClick={() => setSelectedTab('checking')}
            >
              <p className='text-xl font-normal'>틀린말 탐정단</p>
            </button>
            <button
              className={`relative w-[192px] h-[60px] bg-center bg-no-repeat ${
                selectedTab === 'speaking'
                  ? "bg-[url('/speaking_btnon_wrong.svg')] bg-cover text-[#855205]"
                  : "bg-[url('/speaking_btn_wrong.svg')] bg-contain text-[#e78f09]"
              }`}
              onClick={() => setSelectedTab('speaking')}
            >
              <p className='text-xl font-normal'>나야, 발음왕</p>
            </button>
            <button
              className={`relative w-[192px] h-[60px] bg-center bg-no-repeat ${
                selectedTab === 'writing'
                  ? "bg-[url('/writing_btnon_wrong.svg')] bg-cover text-[#115546]"
                  : "bg-[url('/writing_btn_wrong.svg')] bg-contain text-[#2ad4af]"
              }`}
              onClick={() => setSelectedTab('writing')}
            >
              <p className='text-xl font-normal'>빈칸 한 입</p>
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          {selectedTab === 'checking' && <CheckingAnswer />}
          {selectedTab === 'writing' && <WritingAnswer />}
        </div>
      </div>
    </div>
  );
};
export default WrongAnswerPage;

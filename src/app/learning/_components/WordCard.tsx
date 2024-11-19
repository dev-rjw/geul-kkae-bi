'use client';

import { ExtractWordListFromWord } from '@/types/learning';
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';

const WordCard = ({ item }: { item: ExtractWordListFromWord }) => {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date();
  const today = date.getFullYear() + `.` + (date.getMonth() + 1) + `.` + date.getDate();
  return (
    <>
      <button
        className={`w-[202px] h-[327px] flex justify-center pt-[34px]`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <div className='text-[32px]'>{item.word}</div>
          <div className='text-[16px]'>{item.wordClass}</div>
        </div>
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className='flex w-[714px] h-[437px] max-w-[90vw] max-h-[90vh] !rounded-[20px] bg-primary-400 border-none shadow-none justify-center items-center'>
          <div className='flex justify-between w-[630px] h-[361px]'>
            <div className='flex flex-col w-[210px] h-[352px] justify-between'>
              <div className='gap-[8px] text-center'>
                <h2 className='text-[20px]'>{today}</h2>
                <h1 className='text-[32px]'>오늘의 학습카드</h1>
              </div>
              <div className='relative flex items-center w-[13.12rem] aspect-[242/244] max-lg:w-[8.75rem]'>
                <Image
                  src='/character_card_detail_learning.svg'
                  alt='학습 모달 아이콘'
                  fill
                  sizes='11.5rem'
                />
              </div>
            </div>
            <div className='w-[368px] h-[355px] bg-primary-100 rounded-[28px] text-center px-[43px] pt-[36px] pb-[38px]'>
              <div className='pb-[28px]'>
                <h1 className='text-[48px]'>{item.word}</h1>
                <p className='text-[22px]'>{item.wordClass}</p>
              </div>
              <p className='text-[22px]'>{item.definition}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WordCard;

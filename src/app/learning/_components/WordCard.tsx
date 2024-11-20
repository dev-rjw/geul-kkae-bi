'use client';

import { ExtractWordListFromWord } from '@/types/learning';
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import LineTitle from '@/components/LineTitle';

const WordCard = ({ item }: { item: ExtractWordListFromWord }) => {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date();
  const today = date.getFullYear() + `.` + (date.getMonth() + 1) + `.` + date.getDate();
  return (
    <>
      <button
        className={`flex justify-center w-full h-[20.5rem] px-4 pt-10 pb-[2.125rem] rounded-[1.25rem] overflow-hidden max-md:h-[17.25rem]`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <div className='title-32 text-white max-md:text-[1.625rem]'>{item.word}</div>
          <div className='word-card-text'>{item.wordClass}</div>
        </div>
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className='flex w-[44.625rem] h-[27.375rem] max-w-[90vw] max-h-[90vh] !rounded-[1.25rem] px-11 py-[2.375rem] bg-primary-400 border-none shadow-none justify-center items-center max-md:h-auto max-md:px-[1.375rem] max-md:py-6'>
          <div className='flex justify-between w-full h-full max-md:flex-col'>
            <div className='flex flex-col justify-between py-[0.375rem]'>
              <div className='text-center mb-3 max-md:mb-6'>
                <div className='title-20 text-primary-100 mb-4 max-md:text-base max-md:mb-2'>{today}</div>
                <LineTitle
                  className='title-32 font-normal text-primary-100 max-md:text-[1.625rem]'
                  lineClassName='bg-primary-500 !-bottom-1 !w-[calc(100%+10px)]'
                >
                  <span><span className='text-primary-50'>오늘</span>의 <span className='text-primary-50'>학습</span>카드</span>
                </LineTitle>
              </div>
              <div className='relative flex items-center w-[14.5rem] aspect-[232/224] -ml-3 max-md:w-[12.375rem] max-md:-z-[1] max-md:mx-auto max-md:-mb-14'>
                <Image
                  src='/character_card_detail_learning.svg'
                  alt='학습 모달 아이콘'
                  fill
                  sizes='14.5rem'
                />
              </div>
            </div>

            <div className='w-[23rem] bg-primary-100 rounded-[1.75rem] text-center px-[2.625rem] pt-11 pb-[2.375rem] shadow-[4px_4px_0_#1965D2] max-md:w-full max-md:px-9 max-md:pt-8 max-md:pb-[1.875rem]'>
              <div className='pb-7 text-center max-md:pb-[1.375rem]'>
                <div className='text-5xl leading-tight font-yangjin text-primary-700 max-md:text-[2.5rem]'>{item.word}</div>
                <div className='inline-block body-22 px-[1.125rem] text-primary-100 bg-primary-500 mt-4 rounded-full max-md:text-lg max-md:mt-3'>
                  {item.wordClass}
                </div>
              </div>
              <div className='body-22 text-primary-600 max-md:text-lg'>{item.definition}</div>
            </div>
          </div>
          <DialogClose asChild>
            <Button
              size='icon'
              className='absolute top-4 right-4 w-8 h-8 [&_svg]:size-8 bg-transparent max-md:w-6 max-md:h-6 max-md:[&_svg]:size-6'
            >
              <X className='text-primary-100' />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WordCard;

'use client';

import { ExtractWordListFromWord } from '@/types/learning';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const WordCard = ({ item }: { item: ExtractWordListFromWord }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className='w-[202px] h-[327px] bg-emerald-200'
        key={item.word}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <div>{item.word}</div>
          <div>{item.wordClass}</div>
        </div>
      </button>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{item.word}</DialogTitle>
            <DialogDescription>{item.wordClass}</DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            <p>{item.definition}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WordCard;

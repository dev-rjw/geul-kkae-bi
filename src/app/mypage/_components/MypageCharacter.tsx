'use client';
import ModalPortal from '@/components/ModalPortal';
import { useAuth } from '@/queries/useAuth';
import { useUserRank } from '@/queries/useRank';
import { weekCalculate } from '@/utils/rank/client-action';
import Image from 'next/image';
import { useState } from 'react';
import { X, Info } from 'lucide-react';
import LineTitle from '@/components/LineTitle';

const MypageCharacter = () => {
  const { data } = useAuth();
  const user_id = data?.id;
  const { data: rank } = useUserRank(user_id!, weekCalculate(0));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const imgArray = [
    { name: '1단계', width: 181, height: 63 },
    { name: '2단계', width: 136, height: 73 },
    { name: '3단계', width: 127, height: 108 },
    { name: '4단계', width: 142, height: 119 },
  ];

  return (
    <div className='relative rounded-3xl aspect-[714/370] bg-primary-100 overflow-hidden max-md:rounded-[0.875rem]'>
      {rank?.total === null ? (
        <Image
          src='/character0.svg'
          alt='character0'
          fill
          sizes='44.625rem'
          className='object-cover'
        />
      ) : (
        ''
      )}
      {rank?.total !== null && rank?.total >= 0 && rank?.total < 75 ? (
        <Image
          src='/character1.svg'
          alt='character1'
          fill
          sizes='44.625rem'
          className='object-cover'
        />
      ) : (
        ''
      )}
      {rank?.total >= 75 && rank?.total < 150 ? (
        <Image
          src='/character2.svg'
          alt='character2'
          fill
          sizes='44.625rem'
          className='object-cover'
        />
      ) : (
        ''
      )}
      {rank?.total >= 150 && rank?.total < 224 ? (
        <Image
          src='/character3.svg'
          alt='character3'
          fill
          sizes='44.625rem'
          className='object-cover'
        />
      ) : (
        ''
      )}
      {rank?.total >= 225 && rank?.total <= 300 ? (
        <Image
          src='/character4.svg'
          alt='character4'
          fill
          sizes='44.625rem'
          className='object-cover'
        />
      ) : (
        ''
      )}

      <button
        className='flex absolute top-[1.875rem] right-[1.875rem] z-10 max-md:top-3 max-md:right-3'
        onClick={() => setIsModalOpen(true)}
      >
        <Info className='w-[1.375rem] h-[1.375rem] text-white' />
      </button>
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className='container w-screen'>
          <div className='flex flex-col relative items-center bg-primary-300 p-11 rounded-2xl mx-auto overflow-hidden max-lg:px-5 max-md:pt-4 max-md:pb-7 max-md:rounded-md'>
            <button
              className='text-white absolute top-[1.25rem] right-[1.25rem] w-10 h-10 max-md:w-5 max-md:h-5 max-md:top-2 max-md:right-2'
              onClick={handleCloseModal}
            >
              <X className='w-10 h-10 max-md:w-5 max-md:h-5' />
            </button>
            {/* 상단 제목 */}
            <div className='mb-10'>
              <LineTitle
                className={`title-36 font-normal text-white max-lg:text-2xl max-md:text-sm`}
                lineClassName={`!w-[calc(100%+0.75rem)] bg-primary-400`}
              >
                변화 단계
              </LineTitle>
            </div>
            {/* 단계별 캐릭터 */}
            <div className='relative z-10 grid grid-cols-4 w-full'>
              {/* 각 단계 */}
              {imgArray.map((stage, index) => (
                <div
                  key={index}
                  className='relative flex flex-col items-center gap-5'
                >
                  {/* 단계 번호 */}
                  <span className='w-[6.75rem] bg-primary-400 text-white text-2xl font-bold text-center py-1 rounded-full max-lg:w-[4rem] max-lg:text-base max-md:w-[2.5rem] max-md:text-[0.625rem] max-md:py-0'>
                    {stage.name}
                  </span>
                  {/* 화살표: 마지막 단계에는 표시하지 않음 */}
                  {index < 3 && (
                    <div className='absolute top-2 right-0 translate-x-1/2 w-[6rem] aspect-[96/20] max-lg:w-[4.5rem] max-lg:top-2 max-md:w-[1.875rem]'>
                      <Image
                        src='/line.png'
                        alt='화살표'
                        fill
                        sizes=''
                      />
                    </div>
                  )}
                  {/* 각 단계의 이미지 */}
                  <div className='relative w-[12rem] aspect-[192/126] max-lg:w-[9rem] max-md:w-[4rem]'>
                    <Image
                      src={`/kkae_bi_${index + 1}@2x.png`}
                      alt={`Stage ${index + 1}`}
                      fill
                      sizes='24rem'
                      className='object-contain'
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className='absolute bottom-0 left-0 w-full h-[28%] bg-[#3983ED]' />
          </div>
        </div>
      </ModalPortal>
    </div>
  );
};

export default MypageCharacter;

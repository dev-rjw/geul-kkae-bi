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
        className='flex absolute top-[1.875rem] right-[1.875rem]'
        onClick={() => setIsModalOpen(true)}
      >
        <Info className='w-[1.375rem] h-[1.375rem] text-white' />
      </button>
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className='flex flex-col relative items-center bg-[#649CED] p-6 rounded-lg  max-w-4xl w-[1086px] h-[262px] mx-auto'>
          {/* 상단 제목 */}
          <div className='flex'>
            <div className='mb-10'>
              <LineTitle
                className={`title-36 font-normal text-white`}
                lineClassName={`!w-[calc(100%+0.75rem)] bg-primary-400`}
              >
                변화 단계
              </LineTitle>
            </div>
            <button
              className='text-white font-bold text-2xl absolute top-[1.875rem] right-[1.875rem]'
              onClick={handleCloseModal}
            >
              <X className='flex' />
            </button>
          </div>
          <div className='absolute bottom-0 left-0 w-full h-[33.3333%] bg-[#3983ED]'></div>
          {/* 단계별 캐릭터 */}
          <div className='flex items-center justify-between w-full'>
            {/* 각 단계 */}
            {imgArray.map((stage, index) => (
              <div
                key={index}
                className='flex flex-col items-center relative w-[200px] h-[120px]'
              >
                {/* 단계 번호 */}
                <span className='bg-primary-400 text-white text-md font-semibold px-2 py-1 rounded-full mb-2'>
                  &nbsp;&nbsp;&nbsp;{stage.name}&nbsp;&nbsp;&nbsp;
                </span>
                {/* 화살표: 마지막 단계에는 표시하지 않음 */}
                {index < 3 && (
                  <div className='absolute right-0 top-0 transform translate-x-10'>
                    <Image
                      src={`/Line.png`}
                      alt={`line`}
                      width={96}
                      height={1}
                      className='mb-2'
                    />
                  </div>
                )}
                {/* 각 단계의 이미지 */}
                <Image
                  src={`/kkae_bi_${index + 1}.png`}
                  alt={`Stage ${index + 1}`}
                  width={stage.width}
                  height={stage.height}
                  className={`mb-2 ${index < 2 ? ' mt-[20px]' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalPortal>
    </div>
  );
};

export default MypageCharacter;

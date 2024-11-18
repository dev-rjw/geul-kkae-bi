'use client';
import ModalPortal from '@/components/ModalPortal';
import { useAuth } from '@/queries/useAuth';
import { useUserRank } from '@/queries/useRank';
import { weekCalculate } from '@/utils/rank/client-action';
import Image from 'next/image';
import { useState } from 'react';

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
    <>
      <div className='bg-primary-50 rounded-3xl border border-primary-100'>
        {rank?.total === null ? (
          <Image
            src={'/character0.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total !== null && rank?.total >= 0 && rank?.total < 75 ? (
          <Image
            src={'/character1.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 75 && rank?.total < 150 ? (
          <Image
            src={'/character2.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 150 && rank?.total < 224 ? (
          <Image
            src={'/character3.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}
        {rank?.total >= 225 && rank?.total <= 300 ? (
          <Image
            src={'/character4.svg'}
            alt='Profile'
            width={716}
            height={267}
            className='object-cover justify-self-center rounded-3xl'
          />
        ) : (
          ''
        )}

        <button onClick={() => setIsModalOpen(true)}>i</button>
        <ModalPortal
          open={isModalOpen}
          onClose={handleCloseModal}
        >
          {' '}
          <div className='flex flex-col items-center bg-blue-500 p-6 rounded-lg  max-w-4xl w-[1086px] mx-auto'>
            {/* 상단 제목 */}
            <div className='flex'>
              <h2 className='text-white text-2xl font-bold mb-6'>변화 단계</h2>
              <button
                className='text-white font-bold text-2xl'
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            {/* 단계별 캐릭터 */}
            <div className='flex items-center justify-between w-full'>
              {/* 각 단계 */}
              {imgArray.map((stage, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center relative'
                >
                  {/* 단계 번호 */}
                  <span className='bg-blue-700 text-white text-sm font-semibold px-2 py-1 rounded-full mb-2'>
                    {stage.name}
                  </span>
                  {/* 화살표: 마지막 단계에는 표시하지 않음 */}
                  {index < 3 && (
                    <div className='absolute right-0 top-0 transform translate-x-10'>
                      <Image
                        src={`/line.png`}
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
                    className='mb-2'
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalPortal>
      </div>

      <div></div>
    </>
  );
};

export default MypageCharacter;

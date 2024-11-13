'use client';

import ModalPortal from '@/components/ModalPortal';
import { CheckingResult } from '@/types/checking';
import { useEffect, useState } from 'react';
const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<CheckingResult[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const checkingResult = localStorage.getItem('checkingQuizResults');
    if (checkingResult) setResult(JSON.parse(checkingResult));
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className='z-10'>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <ul>
          {result.map((result, index) => {
            return (
              <li key={result.test}>
                <div className='flex justify-end items-center'>
                  <p>입력한 답: {result.userAnswer}</p>
                  <button onClick={() => setOpenResult(openResult === index ? null : index)}>정답 확인</button>
                </div>
                {openResult === index && (
                  <div>
                    <p>문제 {result.test}</p>
                    {result.option.map((item, index) => {
                      return (
                        <div key={item}>
                          <p>{index}</p>
                          <p>{item}</p>
                        </div>
                      );
                    })}
                    <p>
                      정답 {result.answer} {result.right}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <button onClick={handleCloseModal}>모달 닫기</button>
      </ModalPortal>
    </div>
  );
};
export default Modal;

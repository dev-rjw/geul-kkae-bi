'use client';

import ModalPortal from '@/components/ModalPortal';
import { PartialQuestion } from '@/types/writing';
import { useEffect, useState } from 'react';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<PartialQuestion[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const writingResult = localStorage.getItem('writingQuizResults');
    if (writingResult) setResult(JSON.parse(writingResult));
  }, []);

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
                    <p>키워드 {result.keyword} </p>
                    <p>문제 {result.test}</p>
                    <p>{result.meaning}</p>
                    <p>정답 {result.answer}</p>
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

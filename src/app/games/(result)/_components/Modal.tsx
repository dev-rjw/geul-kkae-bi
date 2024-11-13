'use client';

import ModalPortal from '@/components/ModalPortal';
import { useState } from 'react';
const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className='z-10'>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <button onClick={handleCloseModal}>모달 닫기</button>
      </ModalPortal>
    </div>
  );
};
export default Modal;

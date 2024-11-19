'use client';
import ModalPortal from '@/components/ModalPortal';
import ModalSpeaking from './ModalSpeaking';
import { useState } from 'react';
import ModalWriting from './ModalWriting';
import ModalChecking from './ModalChecking';

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGameType, setCurrentGameType] = useState<string | null>(null);

  const handleOpenModal = () => {
    const gameType = localStorage.getItem('lastGameType');
    setCurrentGameType(gameType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div className='z-10 '>
      <button onClick={handleOpenModal}>모달 열기</button>
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        {currentGameType === 'speaking' && <ModalSpeaking handleCloseModal={handleCloseModal} />}
        {currentGameType === 'writing' && <ModalWriting handleCloseModal={handleCloseModal} />}
        {currentGameType === 'checking' && <ModalChecking handleCloseModal={handleCloseModal} />}
      </ModalPortal>
    </div>
  );
};
export default Modal;

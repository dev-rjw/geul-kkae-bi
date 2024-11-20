'use client';
import ModalPortal from '@/components/ModalPortal';
import ModalSpeaking from './ModalSpeaking';
import { useState } from 'react';
import ModalWriting from './ModalWriting';
import ModalChecking from './ModalChecking';
import { Button } from '@/components/ui/button';

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
    <>
      <Button
        onClick={handleOpenModal}
        className='solid-light-button min-w-[6.75rem] max-md:w-full'
      >
        오답 확인
      </Button>
      
      <ModalPortal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        {currentGameType === 'speaking' && <ModalSpeaking handleCloseModal={handleCloseModal} />}
        {currentGameType === 'writing' && <ModalWriting handleCloseModal={handleCloseModal} />}
        {currentGameType === 'checking' && <ModalChecking handleCloseModal={handleCloseModal} />}
      </ModalPortal>
    </>
  );
};
export default Modal;

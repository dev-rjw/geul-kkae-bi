'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import speekStore from '@/store/speekStore';
import TextData from '@/mock/speak';
import { convertAudioToPCM, sendToAudio } from '../utils/audio';
import Image from 'next/image';
import icon from '../../../../../public/ico_audio.png';
import { timeStore } from '@/store/timeStore';
import Tutorial from './Tutorial';

function getRandomQuestion(textArray: string[]) {
  return textArray.sort(() => Math.random() - 0.5).slice(0, 10);
}

const Speak = () => {
  const [randomText, setRandomText] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { text, isRecording, setText, setIsRecording, setIsLoading, resetText, resetPercent, resetIndex } =
    speekStore();
  const { isDelay, resetTimer, setIsDelay } = timeStore();

  const ondataavailable = (event: { data: Blob }) => {
    audioChunks.current = [event.data];
  };

  const onStop = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    audioChunks.current = [];
    const pcmData = await convertAudioToPCM(audioBlob);
    const data = await sendToAudio(pcmData);
    if (data) {
      const jsonText = await data.trim().split(/\n(?={)/);
      const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
      const text = jsonArray[jsonArray.length - 1];
      await setText(text.text);
    }
  };

  useEffect(() => {
    const questions = getRandomQuestion(TextData);
    setRandomText(questions);
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { audioBitsPerSecond: 8000 });
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = ondataavailable;
        recorder.onstop = onStop;
        setIsLoading(false);
      } catch (error) {
        alert('마이크 권한이 필요합니다');
        console.error(error);
      }
    };
    initMediaRecorder();
    return () => {
      setRandomText([]);
      setIsDelay(false);
      resetText();
      resetPercent();
      resetTimer();
      resetIndex();
    };
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current) {
      console.error('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    setIsLoading(true);
    audioChunks.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) {
      console.error('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleStart = () => {
    setIsDelay(true);
  };

  return (
    <div className='h-screen bg-[#FCFBF9]'>
      {!isDelay ? (
        <div className='w-screen h-screen'>
          <Tutorial handleStart={handleStart} />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Question
            text={text}
            randomText={randomText}
          />
          <div className='flex flex-col items-center mt-20 text-center'>
            <button onClick={isRecording ? stopRecording : startRecording}>
              <Image
                src={icon}
                width={160}
                height={160}
                alt='Audio'
                priority
              />
            </button>
            {isRecording ? (
              <p className='text-[1.5rem] leading-normal mt-5'>마이크 버튼을 눌러 종료하기</p>
            ) : (
              <p className='text-[1.5rem] leading-normal mt-5'>마이크 버튼을 눌러 시작하기</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Speak;

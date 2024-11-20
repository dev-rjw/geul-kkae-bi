'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import TextData from '@/mock/speak';
import { convertAudioToPCM, sendToAudio } from '../utils/audio';
import Image from 'next/image';
import { useTimeStore } from '@/store/timeStore';
import Tutorial from './Tutorial';
import { useSpeakStore } from '@/store/speakStore';

type Answer = {
  text: string;
  score: number;
};

function getRandomQuestion(textArray: string[]) {
  return textArray.sort(() => Math.random() - 0.5).slice(0, 10);
}

const Speak = () => {
  const [randomText, setRandomText] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const {
    index,
    text,
    isRecording,
    percent,
    isGame,
    setText,
    setIsRecording,
    setIsLoading,
    resetText,
    resetPercent,
    resetIndex,
    setIsGame,
  } = useSpeakStore();
  const { isDelay, resetTimer, setIsDelay } = useTimeStore();

  const [wrongAnswer, setWrongAnswer] = useState<Answer[]>([]);

  const ondataavailable = (event: { data: Blob }) => {
    audioChunks.current = [event.data];
  };

  const getWrongAnswer = () => {
    if (percent < 30) {
      setWrongAnswer((prevQuestion) =>
        !prevQuestion.some((item) => item.text === randomText[index])
          ? [...prevQuestion, { text: randomText[index], score: percent }]
          : prevQuestion,
      );
    }
  };

  const onStop = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    audioChunks.current = [];
    const pcmData = await convertAudioToPCM(audioBlob);
    const data = await sendToAudio(pcmData);
    if (data) {
      const jsonText = data.trim().split(/\n(?={)/);
      const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
      const text = jsonArray[jsonArray.length - 1];
      setText(text.text);
    }
    setIsLoading(false);
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
      setIsGame(false);
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
    <div className='h-screen bg-secondary-50 max-md:h-[calc(100vh-50px)]'>
      {!isDelay ? (
        <div className='w-screen'>
          <Tutorial handleStart={handleStart} />
        </div>
      ) : (
        <div className='flex flex-col items-center max-md:px-4'>
          <Question
            text={text}
            randomText={randomText}
            getWrongAnswer={getWrongAnswer}
            wrongAnswer={wrongAnswer}
          />
          <div className='flex flex-col items-center mt-20 text-center max-md:mt-[5.188rem]'>
            <button
              disabled={isGame}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <Image
                src={isGame ? '/icon_audio.svg' : isRecording ? '/icon_audio.gif' : '/icon_audio.svg'}
                width={144}
                height={144}
                alt='Audio'
                priority
                className='max-md:w-[5.375rem] max-md:h-[5.375rem]'
              />
            </button>
            {isGame ? (
              <p className='text-[1.5rem] leading-normal mt-5 max-md:text-[12px]'>게임이 종료 되었습니다</p>
            ) : isRecording ? (
              <p className='text-[1.5rem] leading-normal mt-5 max-md:text-[12px]'>마이크 버튼을 눌러 종료하기</p>
            ) : (
              <p className='text-[1.5rem] leading-normal mt-5 max-md:text-[12px]'>마이크 버튼을 눌러 시작하기</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Speak;

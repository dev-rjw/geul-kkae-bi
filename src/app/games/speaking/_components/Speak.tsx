'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import speekStore from '@/store/speekStore';
import TextData from '@/mock/speak';
import { convertAudioToPCM, sendToAudio } from '../utils/audio';
import Image from 'next/image';
import icon from '../../../../../public/ico_audio.png';

const Speak = () => {
  const [randomText, setRandomText] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { text, isRecording, setText, setIsRecording, setIsLoading } = speekStore();
  function getRandomSentences(textArray: string[]) {
    return textArray.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  useEffect(() => {
    const questions = getRandomSentences(TextData);
    setRandomText(questions);
    const initMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { audioBitsPerSecond: 8000 });
        mediaRecorderRef.current = recorder;
        recorder.ondataavailable = (event) => {
          audioChunks.current = [event.data];
        };
        recorder.onstop = async () => {
          setIsLoading(true);
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          audioChunks.current = [];
          // 음성확인
          // const audioUrl = URL.createObjectURL(audioBlob);
          // const audioElement = new Audio(audioUrl);
          // audioElement.play();

          // const data = await sendToAudio(audioBlob);
          // const data = await sendToAudio(await convertAudioToPCM(audioBlob));
          const pcmData = await convertAudioToPCM(audioBlob);
          const data = await sendToAudio(pcmData);
          if (data) {
            const jsonText = await data.trim().split(/\n(?={)/);
            const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
            const text = jsonArray[jsonArray.length - 1];
            await setText(text.text);
          }
          setIsLoading(false);
          // 포맷확인
          // console.log(audioBlob);
        };
      } catch (error) {
        alert('마이크 권한이 필요합니다');
        console.log(error);
      }
    };
    console.log(randomText);
    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current) {
      console.log('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    audioChunks.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) {
      console.log('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center '>
        <Question
          text={text}
          randomText={randomText}
        />
        <div className='flex flex-col items-center my-[60px] text-center'>
          <button onClick={isRecording ? stopRecording : startRecording}>
            <Image
              src={icon}
              width={160}
              height={160}
              alt='Audio'
              priority
            />
            {isRecording ? '마이크 버튼을 눌러 종료하기' : '마이크 버튼을 눌러 시작하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Speak;

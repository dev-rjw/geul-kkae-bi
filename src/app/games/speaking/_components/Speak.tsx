'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import speekStore from '@/store/speekStore';
import TextData from '@/mock/speak';
import { convertAudioToPCM } from '../utils/audio';
import { useAuth } from '@/queries/useAuth';

// 오디오 값 통신
async function sendToAudio(audioBlob: Blob) {
  if (audioBlob.size > 0) {
    console.log('음성데이터가 있습니다', audioBlob);
    const response = await fetch('https://api.wit.ai/speech', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer VUKAET3AVSBYQP5NBQ4N6ABZ4ZCCHMVZ',
        'Content-Type': 'audio/wav',
      },
      body: audioBlob,
    });

    const data = await response.text();
    console.log(data);
    return data;
  } else {
    console.log('음성데이터가 없습니다');
  }
}

const Speak = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [randomText, setRandomText] = useState<string[]>([]);
  const [isAudioStop, setIsAudioStop] = useState(false);
  const audioChunks = useRef<Blob[]>([]);
  const { text, isRecording, setText, setIsRecording } = speekStore();

  const { data } = useAuth();
  console.log(data);

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
        recorder.ondataavailable = (event) => {
          audioChunks.current = [event.data];
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          audioChunks.current = [];
          // 음성확인
          // const audioUrl = URL.createObjectURL(audioBlob);
          // const audioElement = new Audio(audioUrl);
          // audioElement.play();

          const data = await sendToAudio(await convertAudioToPCM(audioBlob));
          if (data == undefined) {
            return;
          }

          const jsonText = data.trim().split(/\n(?={)/);
          const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
          const text = jsonArray[jsonArray.length - 1];
          await setText(text.text);
          setIsAudioStop(true);
          console.log(data);

          // 포맷확인
          // console.log(audioBlob);
        };
        setMediaRecorder(recorder);
      } catch (error) {
        alert('마이크 권한이 필요합니다');
        console.log(error);
      }
    };
    console.log(randomText);
    initMediaRecorder();
  }, []);

  const startRecording = () => {
    if (!mediaRecorder) {
      console.log('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    audioChunks.current = [];
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorder) {
      console.log('MediaRecorder가 초기화되지 않았습니다');
      return;
    }
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center '>
        <Question
          text={text}
          randomText={randomText}
          isAudioStop={isAudioStop}
        />
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? '마이크 버튼을 눌러 종료하기' : '마이크 버튼을 눌러 시작하기'}
        </button>
      </div>
    </div>
  );
};

export default Speak;

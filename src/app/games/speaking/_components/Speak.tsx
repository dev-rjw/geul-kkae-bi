'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import speekStore from '@/store/speekStoreStore';
import TextData from '@/mock/speak';
import { convertAudioToPCM } from '../ts/audio';

const Speak = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
  // const [text, setText] = useState('');
  const [randomText, setRandomText] = useState<string[]>([]);
  const audioChunks = useRef<Blob[]>([]);
  const { index, percent, text, totlaPercent, setText, setPercent } = speekStore();
  const finalPercent = totlaPercent / 10;

  function getRandomSentences(textArray: string[]) {
    return textArray.sort(() => Math.random() - 0.5).slice(0, 10);
  }
  useEffect(() => {
    const questions = getRandomSentences(TextData);
    setRandomText(questions);
    const initMediaRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
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

          // data String값 JSON 변환
          const jsonText = data.trim().split(/\n(?={)/);
          const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
          const text = jsonArray[jsonArray.length - 1];
          await setText(text.text);

          // 포맷확인
          // console.log(audioBlob);
        };
        setMediaRecorder(recorder);
      } else {
        alert('마이크가 없습니다');
      }
    };
    console.log(randomText);
    initMediaRecorder();
  }, []);

  useEffect(() => {
    // text와 randomText가 모두 설정된 후에만 정확도 계산 실행
    if (text && randomText[index]) {
      onclickAccuracy(text, randomText[index]);
    }
  }, [text, randomText, index]);

  const startRecording = () => {
    audioChunks.current = [];
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const onclickAccuracy = function calculateAccuracy(text: string | null, randomText: string) {
    if (text === null) {
      return;
    }

    const maxLength = Math.max(text.length, randomText.length);
    let matches = 0;

    for (let i = 0; i < Math.min(text.length, randomText.length); i++) {
      if (text[i] === randomText[i]) {
        matches++; // 같은 위치의 문자가 일치하면 카운트 증가
      }
    }

    const point = Math.round((matches / maxLength) * 100);
    console.log(point);

    setPercent(point);
  };

  // 오디오 값 통신
  async function sendToAudio(audioBlob) {
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
      return data;
    } else {
      console.log('음성데이터가 업습니다');
    }
  }

  return (
    <div>
      {index > 1 ? (
        <div>
          <p>10문제</p>
          <p>문제: {randomText[index]}</p>
          <p>총점 : {finalPercent}</p>
          <button>결과 보러가기</button>
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? '마이크 버튼을 눌러 종료하기' : '마이크 버튼을 눌러 시작하기'}
          </button>
        </div>
      ) : (
        <div>
          <Question></Question>
          <p>퍼센트: {percent}</p>
          <p>문제: {randomText[index]}</p>
          {/* <p>내가말한 텍스트 : {text}</p> */}
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? '마이크 버튼을 눌러 종료하기' : '마이크 버튼을 눌러 시작하기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Speak;

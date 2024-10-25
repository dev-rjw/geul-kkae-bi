'use client';

import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import speekStore from '@/store/speekStoreStore';

const speak = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
  const [text, setText] = useState('');
  const audioChunks = useRef<Blob[]>([]);

  const { index, percent, totlaPercent, incrementIndex, resetPercent, setPercent, addTotalPercent } = speekStore();

  useEffect(() => {
    const initMediaRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        const recorder = new MediaRecorder(stream, { audioBitsPerSecond: 8000 });
        recorder.ondataavailable = (event) => {
          console.log(event);
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
          console.log(typeof data);
          console.log(data);
          if (data == undefined) {
            return;
          }

          // data String값 JSON 변환
          const jsonText = data.trim().split(/\n(?={)/);
          const jsonArray = jsonText.map((part) => JSON.parse(part.trim()));
          console.log(jsonArray);
          const text = jsonArray[jsonArray.length - 1];
          //   console.log(text.text);
          setText(text.text);

          // 포맷확인
          console.log(audioBlob);
        };
        setMediaRecorder(recorder);
      } else {
        alert('마이크가 없습니다');
      }
    };
    initMediaRecorder();
  }, []);

  const convertAudioToPCM = async (audioBlob) => {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.AudioContext)();

    // Decode the audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const sampleRate = audioBuffer.sampleRate;
    const channelData = audioBuffer.getChannelData(0); // 모노 채널 데이터 가져오기

    // PCM 변환
    const pcmData = new Int16Array(channelData.length);
    for (let i = 0; i < channelData.length; i++) {
      pcmData[i] = Math.max(-1, Math.min(1, channelData[i])) * 0x7fff; // 16비트 변환
    }

    // WAV 포맷 Blob 생성
    const wavBlob = createWavBlob(pcmData, sampleRate);
    return wavBlob;
  };

  // WAV Blob 생성 함수
  const createWavBlob = (pcmData, sampleRate) => {
    const buffer = new ArrayBuffer(44 + pcmData.length * 2);
    const view = new DataView(buffer);

    // RIFF header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmData.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, 1, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    writeString(view, 36, 'data');
    view.setUint32(40, pcmData.length * 2, true); // Subchunk2Size

    // PCM data
    for (let i = 0; i < pcmData.length; i++) {
      view.setInt16(44 + i * 2, pcmData[i], true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  };

  // 문자열 작성 함수
  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const startRecording = () => {
    audioChunks.current = [];
    mediaRecorder.start();
    console.log();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    incrementIndex();
    console.log(index);
    setIsRecording(false);
    // Wit.ai API 호출
  };

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
      <Question text={text}></Question>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? '마이크 버튼을 눌러 종료하기' : '마이크 버튼을 눌러 시작하기'}
      </button>
    </div>
  );
};

export default speak;

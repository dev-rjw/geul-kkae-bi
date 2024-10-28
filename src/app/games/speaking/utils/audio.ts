export const convertAudioToPCM = async (audioBlob: Blob) => {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createWavBlob = (pcmData: string | any[] | Int16Array, sampleRate: number) => {
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
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

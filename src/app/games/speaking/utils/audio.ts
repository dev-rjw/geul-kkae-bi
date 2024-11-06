// 오디오 값 통신
export const sendToAudio = async (audioBlob: Blob) => {
  if (audioBlob.size > 0) {
    console.log('음성데이터가 있습니다', audioBlob);
    const response = await fetch('https://api.wit.ai/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_WITAI_API_KEY}`,
        'Content-Type': 'audio/wav',
      },
      body: audioBlob,
    });

    const data = await response.text();
    return data;
  } else {
    console.log('음성데이터가 없습니다');
  }
};

export const convertAudioToPCM = async (audioBlob: Blob) => {
  const audioContext = new (window.AudioContext || window.AudioContext)();
  const arrayBuffer = await audioBlob.arrayBuffer();

  // Decode the audio data
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0); // 모노 채널 데이터 가져오기

  // PCM 변환
  const pcmData = Int16Array.from(channelData.map((sample) => Math.max(-1, Math.min(1, sample)) * 0x7fff));

  // WAV 포맷 Blob 생성
  const wavBlob = createWavBlob(pcmData, sampleRate);
  return wavBlob;
};

// WAV Blob 생성 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createWavBlob = (pcmData: Int16Array, sampleRate: number) => {
  const buffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(buffer);

  const writeHeader = (offset: number, str: string) =>
    str.split('').forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));

  const setUint32 = (offset: number, value: number) => view.setUint32(offset, value, true);
  const setUint16 = (offset: number, value: number) => view.setUint16(offset, value, true);
  writeHeader(0, 'RIFF');
  setUint32(4, 36 + pcmData.length * 2);
  writeHeader(8, 'WAVE');
  writeHeader(12, 'fmt ');
  setUint32(16, 16); // Subchunk1Size
  setUint16(20, 1); // AudioFormat
  setUint16(22, 1); // NumChannels
  setUint32(24, sampleRate);
  setUint32(28, sampleRate * 2);
  setUint16(32, 2);
  setUint16(34, 16);
  writeHeader(36, 'data');
  setUint32(40, pcmData.length * 2);
  pcmData.forEach((value, i) => view.setInt16(44 + i * 2, value, true));
  return new Blob([buffer], { type: 'audio/wav' });
};

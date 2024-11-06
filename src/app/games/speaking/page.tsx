import { Metadata } from 'next';
import Speak from './_components/Speak';
import './style.css';

export const metadata: Metadata = {
  title: '주어진 문장 읽기 게임',
  description: '주어진 문장 읽고 정확도 확인하는 게임',
};

const page = () => {
  return <Speak />;
};

export default page;

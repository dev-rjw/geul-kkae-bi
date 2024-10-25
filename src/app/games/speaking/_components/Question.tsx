'use client';
import speekStore from '@/store/speekStoreStore';

const Question = () => {
  const { index, percent, resetText, resetPercent, incrementIndex, addTotalPercent } = speekStore();

  console.log(index);
  return (
    <div>
      <p>{index + 1}문제</p>
      <button
        onClick={() => {
          addTotalPercent(percent);
          resetPercent();
          resetText();
          incrementIndex();
        }}
      >
        넘어가기
      </button>
    </div>
  );
};

export default Question;

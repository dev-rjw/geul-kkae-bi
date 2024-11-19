'use client';
type Props = {
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

const Pagintaion = ({ handlePrevPage, handleNextPage }: Props) => {
  return (
    <div>
      <button onClick={handlePrevPage}>이전 페이지</button>
      <button onClick={handleNextPage}>다음 페이지</button>
    </div>
  );
};

export default Pagintaion;

'use client';
type Props = {
  setCurrentPage: (state: number) => void;
};

const Pagintaion = ({ setCurrentPage }: Props) => {
  return (
    <div>
      <button onClick={() => setCurrentPage}>다음 페이지</button>
    </div>
  );
};

export default Pagintaion;

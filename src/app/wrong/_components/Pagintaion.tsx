'use client';
type Props = {
  // currentPage: number; // 현재 페이지
  // totalItems: number; // 데이터의 총 개수
  // contentsPerPage: number; // 보여줄 페이지 개수
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

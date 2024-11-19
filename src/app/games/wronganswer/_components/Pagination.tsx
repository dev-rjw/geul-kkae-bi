'use client';
type Props = {
  currentPage: number;
  totalItems: number | undefined;
  contentsPerPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

const Pagintaion = ({ currentPage, totalItems, contentsPerPage, handlePrevPage, handleNextPage }: Props) => {
  const totalPage = Math.floor((totalItems ?? 0) / contentsPerPage);
  return (
    <>
      <button
        className={`${currentPage === 1 ? 'disable' : ''} pagination-button prev`}
        onClick={handlePrevPage}
      ></button>
      <button
        className={`${currentPage === totalPage ? 'disable' : ''} pagination-button next`}
        onClick={handleNextPage}
      ></button>
    </>
  );
};

export default Pagintaion;

interface Props {
  className?: string | null;
}
const IconChevronRight = ({ className }: Props) => {
  return (
    <svg
      width='12'
      height='18'
      viewBox='0 0 12 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || ''}
    >
      <path
        d='M2.5 16L9.5 9L2.5 2'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconChevronRight;

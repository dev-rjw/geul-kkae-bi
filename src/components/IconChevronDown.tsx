interface Props {
  className?: string | null;
}
const IconChevronDown = ({ className }: Props) => {
  return (
    <svg
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className || ''}
    >
      <path
        d='M1 1L7 7L13 1'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconChevronDown;

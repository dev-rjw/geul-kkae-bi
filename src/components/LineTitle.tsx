interface Props {
  children: React.ReactNode;
  className?: string | null;
  lineClassName?: string | null;
}

const LineTitle = ({ children, className, lineClassName }: Props) => {
  return (
    <div className={`relative inline-flex font-bold leading-none ${className || ''}`}>
      <div className='relative z-10 inline-flex items-center'>{children}</div>
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/6 ${lineClassName || ''}`}></div>
    </div>
  );
};

export default LineTitle;

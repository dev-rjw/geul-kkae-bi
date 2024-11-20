const loading = () => {
  return (
    <div className='w-screen min-h-content py-10 flex items-center justify-center'>
      <img
        className='object-contain w-[27.875rem] max-md:w-64'
        src='/loading@2x.gif'
        alt='로딩중'
      />
    </div>
  );
};

export default loading;

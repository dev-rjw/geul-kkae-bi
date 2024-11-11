type delay = {
  handleStart: () => void;
};

const Tutorial = ({ handleStart }: delay) => {
  return (
    <div className='w-full mx-auto bg-[#858584]'>
      <div className="bg-center h-screen bg-[url('/speak_tutorial.svg')] bg-contain bg-no-repeat">
        <button
          onClick={handleStart}
          className='bg-[#92B9F2] absolute bottom-8 right-[62px] w-[258px] py-[17px] rounded-[80px]'
        >
          <span className='text-[38px] font-bold'>시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default Tutorial;

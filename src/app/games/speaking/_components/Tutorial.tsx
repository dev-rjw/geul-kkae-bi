type Delay = {
  handleStart: () => void;
};

const Tutorial = ({ handleStart }: Delay) => {
  return (
    <div className='w-full mx-auto bg-[#252424]'>
      <div className="bg-center h-screen bg-[url('/speak_tutorial.svg')] bg-contain bg-no-repeat">
        <button
          onClick={handleStart}
          className='start_btn absolute bottom-[4.375rem] right-[62px] w-[13.063rem] py-[15px] rounded-[80px]'
        >
          <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
        </button>
      </div>
    </div>
  );
};

export default Tutorial;

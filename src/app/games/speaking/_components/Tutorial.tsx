type delay = {
  setIsDelay: (value: boolean) => void;
};

const Tutorial = ({ setIsDelay }: delay) => {
  return (
    <div className="absolute w-full z-10 h-[100vh] bg-[url('/speak_tutorial.svg')] bg-cover">
      <button
        onClick={() => setIsDelay(true)}
        className='bg-[#92B9F2] absolute bottom-8 right-[62px] w-[258px] py-[17px] rounded-[80px]'
      >
        <span className='text-[38px] font-bold'>시작하기</span>
      </button>
    </div>
  );
};

export default Tutorial;

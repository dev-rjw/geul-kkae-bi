import Speak from './_components/Speak';
import Timer from './_components/Timer';

const page = () => {
  return (
    <div className='h-90vh bg-[#FCFBF9]'>
      <Timer></Timer>
      <Speak />
    </div>
  );
};

export default page;

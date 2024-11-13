import LineTitle from '@/components/LineTitle';
import Image from 'next/image';

const MypageCharacter = () => {
  return (
    <>
      <div className='bg-primary-50 rounded-3xl border border-primary-100'>
        <div className='flex justify-center mb-6 mt-8'>
          <LineTitle
            className='text-[2rem] text-primary-500'
            lineClassName='bg-primary-100'
          >
            RANKING
          </LineTitle>
        </div>

        <Image
          src={'/coding.svg'}
          alt='Profile'
          width={609}
          height={267}
          className='object-cover justify-self-center'
        />
      </div>

      <div className='hidden justify-center items-center h-[20vh] bg-blue-50'>
        <div className='relative'>
          <div className='bg-purple-200 text-purple-800 p-4 rounded-lg w-40'>
            덕분에 도깨비 왕국을 열심히 재건 중이야.
          </div>
          <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2'>
            <svg
              className='text-purple-200 w-6 h-6'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M24 12l-8-8v4H8v8h8v4z' />
            </svg>
          </div>
        </div>

        <div className='relative mx-8'>
          <Image
            src='/kkae_bi.png'
            alt='Character'
            width={180}
            height={180}
          />
        </div>

        <div className='relative'>
          <div className='bg-green-200 text-green-800 p-4 rounded-lg w-40'>병을 완전히 고치려면 OOO이 더 필요해</div>
          <div className='absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2'>
            <svg
              className='text-green-200 w-6 h-6'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M0 12l8-8v4h8v8H8v4z' />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default MypageCharacter;

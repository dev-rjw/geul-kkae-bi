import Link from 'next/link';
import Avatar from './Avatar';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/queries/useAuth';
import { useUser } from '@/queries/useUser';

type MyProfileInfoProps = {
  setOpen?: (isOpen: boolean) => void; // 선택적 prop
};

const MyProfileInfo = ({ setOpen }: MyProfileInfoProps) => {
  const { data, isLoading } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </div>
    );
  }

  return (
    <>
      {setOpen ? (
        <Link
          className='block p-4 hover:bg-secondary-50'
          href='/mypage/information'
          onClick={handleClose}
        >
          <div className='flex items-center gap-[0.625rem]'>
            <Avatar
              src={user?.image}
              size='3rem'
              className='w-[3rem] max-md:w-[2.125rem] border border-gray-100'
            />
            <div className='w-[calc(100%-2.625rem)]'>
              <div className='flex items-center'>
                <span className='text-lg font-bold text-primary-500 max-md:text-sm max-md:leading-tight'>
                  {user?.nickname}
                </span>
                <ChevronRight className='text-gray-600 max-md:w-4 max-md:h-4 max-md:ml-[0.125rem]' />
              </div>
              <div className='w-full caption-14 text-gray-400 text-ellipsis overflow-hidden max-md:text-[0.688rem]'>
                {user?.email}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          className='block p-4 hover:bg-secondary-50'
          href='/mypage/information'
        >
          <div className='flex items-center gap-[0.625rem]'>
            <Avatar
              src={user?.image}
              size='3rem'
              className='w-[3rem] max-md:w-[2.125rem] border border-gray-100'
            />
            <div className='w-[calc(100%-2.625rem)]'>
              <div className='flex items-center'>
                <span className='text-lg font-bold text-primary-500 max-md:text-sm max-md:leading-tight'>
                  {user?.nickname}
                </span>
                <ChevronRight className='text-gray-600 max-md:w-4 max-md:h-4 max-md:ml-[0.125rem]' />
              </div>
              <div className='w-full caption-14 text-gray-400 text-ellipsis overflow-hidden max-md:text-[0.688rem]'>
                {user?.email}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default MyProfileInfo;

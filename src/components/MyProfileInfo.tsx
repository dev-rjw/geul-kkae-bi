import Link from 'next/link';
import Avatar from './Avatar';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/queries/useAuth';
import { useUser } from '@/queries/useUser';

const MyProfileInfo = () => {
  const { data, isLoading } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </div>
    );
  }

  return (
    <Link
      className='block p-4 hover:bg-secondary-50'
      href='/mypage/information'
    >
      <div className='flex items-center gap-[0.625rem]'>
        <Avatar
          src={user?.image}
          size='3rem'
          className='w-[3rem] h-[3rem] max-md:w-[2.125rem] max-md:h-[2.125rem] border border-gray-100'
        />
        <div>
          <div className='flex items-center'>
            <span className='text-lg font-bold text-primary-500 max-md:text-[0.813rem] max-md:leading-tight'>{user?.nickname}</span>
            <ChevronRight className='text-gray-600 max-md:w-4 max-md:h-4 max-md:ml-[0.125rem]' />
          </div>
          <div className='caption-14 text-gray-400 max-md:text-[0.625rem]'>{user?.email}</div>
        </div>
      </div>
    </Link>
  );
};

export default MyProfileInfo;

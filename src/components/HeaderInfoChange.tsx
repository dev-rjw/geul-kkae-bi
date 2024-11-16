'use client';

import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useSignout } from '@/utils/sign/signout';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/queries/useAuth';
import { useUser } from '@/queries/useUser';
import { ChevronDown, Loader2, LogOut, UserRound } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Avatar from './Avatar';
import DefaultButton from './DefaultButton';
import MyProfileInfo from './MyProfileInfo';

const HeaderInfoChange = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data, isLoading } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);
  const { handleSignout } = useSignout();

  // auth 변화 감지
  supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ['user', 'client'] });
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </div>
    );
  }

  return (
    <>
      {data ? (
        <>
          <div className='max-md:hidden'>
            <Popover>
              <PopoverTrigger>
                <div className='flex items-center gap-[0.625rem] max-md:hidden'>
                  <div className='text-right'>
                    <div className='caption-14 text-primary-500'>어서오세요!</div>
                    <div className='font-bold text-gray-700'>
                      <span className='text-lg text-primary-500 max-lg:text-base'>{user?.nickname}</span>님
                    </div>
                  </div>

                  <Avatar
                    src={user?.image}
                    size='3rem'
                    className='w-[3rem] h-[3rem] border border-gray-100'
                  />
                  <ChevronDown className='text-gray-600' />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className='rounded-[1.25rem] border-0 p-0 overflow-hidden'
                style={{ boxShadow: '0 0 4px rgba(0,0,0,0.25)' }}
              >
                <MyProfileInfo />
                <div className='h-1 bg-gray-100 border-t border-gray-200'></div>
                <div className='flex flex-col'>
                  <Link
                    className='flex items-center gap-2 px-4 py-2 hover:bg-secondary-50'
                    href='/mypage'
                  >
                    <div className='flex items-center justify-center w-7 h-7 rounded-full bg-primary-50'>
                      <UserRound className='!w-5 !h-5 text-primary-200' />
                    </div>
                    <span className='text-lg font-bold text-gray-600'>마이페이지</span>
                  </Link>
                </div>
                <Button
                  className='flex gap-[0.375rem] w-full justify-start text-sm font-bold rounded-none bg-primary-50 text-gray-500 hover:bg-primary-100'
                  onClick={handleSignout}
                >
                  <LogOut className='text-base' />
                  로그아웃
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <Link
            className='hidden max-md:flex'
            href='/mypage'
          >
            <Avatar
              src={user?.image}
              size='2rem'
              className='w-[2rem] h-[2rem] border border-gray-100'
            />
          </Link>
        </>
      ) : (
        <div className='relative z-10 flex items-center gap-6 justify-end'>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-24 max-md:min-w-14'
          >
            <Link href='/signin'>로그인</Link>
          </DefaultButton>
        </div>
      )}
    </>
  );
};

export default HeaderInfoChange;

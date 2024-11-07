'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/queries/useAuth';
import Swal from 'sweetalert2';
import { Award, ChevronDown, ChevronRight, Loader2, LogOut, UserRound } from 'lucide-react';
import DefaultButton from './DefaultButton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { fetchCurrentUserInfo } from '@/utils/user/client-action';

export type User = {
  user_id: string;
  nickname: string;
  introduction: string | null;
  image: string | null;
  email: string;
  created_at: string;
};

const HeaderInfoChange = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<User>();

  // useAuth을 통해 로그인 상태 확인
  const { data: auth, isLoading } = useAuth();

  useEffect(() => {
    if (auth) {
      const email = auth?.user_metadata.email;
      fetchCurrentUserInfo(email).then((elemant) => setUser(elemant));
    }
  }, [auth]);

  // auth 변화 감지
  supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ['user', 'client'] });
  });

  const signout = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃에 실패했습니다.');
    } else {
      Swal.fire({
        html: `<div class="text-gray-700">로그아웃 되었습니다.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });

      router.push('/');
    }
  };

  if (isLoading) {
    return <Loader2 className='mr-2 h-4 w-4 animate-spin' />;
  }

  return (
    <>
      {auth ? (
        <Popover>
          <PopoverTrigger>
            <div className='flex items-center gap-[0.625rem]'>
              <div className='text-right'>
                <div className='caption-14 text-primary-500'>어서오세요!</div>
                <div className='font-bold text-gray-700'>
                  <span className='text-lg text-primary-500'>{user?.nickname}</span>님
                </div>
              </div>
              <Avatar className='w-12 h-12 border border-gray-100'>
                <AvatarImage
                  src={user?.image ?? '/default-avatar.png'}
                  alt={user?.nickname}
                  className='object-cover'
                />
                <AvatarFallback
                  className='w-full h-full object-cover'
                  style={{ backgroundImage: 'url(/default_img.jpg)' }}
                ></AvatarFallback>
              </Avatar>
              <ChevronDown className='text-gray-600' />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className='rounded-[1.25rem] border-0 p-0 overflow-hidden'
            style={{ boxShadow: '0 0 4px rgba(0,0,0,0.25)' }}
          >
            <Link
              className='block p-4 hover:bg-secondary-50'
              href='/mypage/information'
            >
              <div className='flex items-center gap-[0.625rem]'>
                <Avatar className='w-12 h-12 border border-gray-100'>
                  <AvatarImage
                    src={user?.image ?? '/default-avatar.png'}
                    alt={user?.nickname}
                    className='object-cover'
                  />
                  <AvatarFallback
                    className='w-full h-full object-cover'
                    style={{ backgroundImage: 'url(/default_img.jpg)' }}
                  ></AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex items-center'>
                    <span className='text-lg font-bold text-primary-500'>{user?.nickname}</span>
                    <ChevronRight className='text-gray-600' />
                  </div>
                  <div className='caption-14 text-gray-400'>{user?.email}</div>
                </div>
              </div>
            </Link>
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
              <Link
                className='flex items-center gap-2 px-4 py-2 hover:bg-secondary-50'
                href='/games/rank'
              >
                <div className='flex items-center justify-center w-7 h-7 rounded-full bg-primary-50'>
                  <Award className='!w-5 !h-5 text-primary-200' />
                </div>
                <span className='text-lg font-bold text-gray-600'>랭킹</span>
              </Link>
            </div>
            <Button
              className='flex gap-[0.375rem] w-full justify-start text-sm font-bold rounded-none bg-primary-50 text-gray-500 hover:bg-primary-100'
              onClick={signout}
            >
              <LogOut className='text-base' />
              로그아웃
            </Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className='flex items-center gap-6 justify-end'>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-24'
          >
            <Link href='/signin'>로그인</Link>
          </DefaultButton>
        </div>
      )}
    </>
  );
};

export default HeaderInfoChange;

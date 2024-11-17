'use client';

import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import LineTitle from '@/components/LineTitle';
import { useAuth } from '@/queries/useAuth';
import DefaultButton from '@/components/DefaultButton';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useUser } from '@/queries/useUser';
import { deleteUser } from '@/utils/auth/server-action';
import { useSignout } from '@/utils/sign/signout';

const MypageProfile = () => {
  const { data } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);
  const { handleSignout } = useSignout();

  const router = useRouter();

  // 회원탈퇴
  const handleDeleteUser = async () => {
    Swal.fire({
      html: `<div class="text-gray-700">정말 탈퇴하시겠습니까?</div><div class="text-lg text-gray-500 mt-2">탈퇴 버튼 선택 시, <br />계정은 삭제되며 복구되지 않습니다.</div>`,
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
        cancelButton: 'swal-custom-button',
      },
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '탈퇴',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser();

          Swal.fire({
            html: `<div class="text-gray-700">탈퇴가 완료되었습니다.</div>`,
            customClass: {
              title: 'swal-custom-title',
              htmlContainer: 'swal-custom-text',
              confirmButton: 'swal-custom-button',
            },
            confirmButtonText: '확인',
          });

          router.push('/');
        } catch (error) {
          console.error(error);

          Swal.fire({
            html: `<div class="text-gray-700">탈퇴에 실패했습니다.</div>`,
            customClass: {
              title: 'swal-custom-title',
              htmlContainer: 'swal-custom-text',
              confirmButton: 'swal-custom-button',
            },
            confirmButtonText: '확인',
          });
        }
      }
    });
  };

  return (
    <>
      <div className='flex flex-col items-stretch min-w-[21.75rem] w-full lg:w-1/3 px-[2.375rem] py-8 bg-primary-400 rounded-3xl text-white max-md:w-screen max-md:min-w-[auto] max-md:-mx-4 max-md:rounded-t-none max-md:rounded-b-[1.25rem] max-md:px-4 max-md:py-5 max-md:pb-[2.125rem]'>
        <div className='flex max-md:hidden justify-center mb-[2.5rem]'>
          <LineTitle
            className='text-[2rem] text-primary-50'
            lineClassName='bg-[#488CEE]'
          >
            MY PAGE
          </LineTitle>
        </div>

        <div className='hidden max-md:flex justify-center mb-7'>
          <LineTitle
            className='text-xl text-primary-100'
            lineClassName='bg-[#1F6AD6]'
          >
            PROFILE
          </LineTitle>
        </div>

        <div className='flex flex-col flex-wrap h-full max-md:flex-row max-md:gap-5'>
          <div className='flex flex-col w-full max-md:flex-row max-md:justify-center max-md:items-center max-md:gap-5 max-md:mx-auto'>
            <Avatar
              src={user?.image}
              size='17rem'
              className='w-[17rem] mx-auto max-md:w-[10.5rem] max-md:max-w-[10.5rem] max-md:m-0'
            />
            <div>
              <div className='mt-[2.5rem] text-center max-md:mt-0 max-md:text-left'>
                <h2 className='text-[1.75rem] font-bold max-md:text-xl max-md:font-yangjin max-md:font-normal'>
                  {user?.nickname ? user?.nickname : '닉네임'}
                </h2>
                <p className='text-[1.25rem] font-bold text-primary-200 mt-2 max-md:text-xs max-md:mt-[0.125rem]'>
                  {user?.email ? user?.email : '@email.com'}
                </p>
                <p className='text-[1.25rem] font-bold text-primary-100 mt-[1.125rem] max-md:text-sm max-md:font-semibold max-md:mt-3'>
                  {user?.introduction?.trim() ? user?.introduction?.trim() : '한 줄 소개가 없습니다.'}
                </p>
              </div>
              <div className='flex items-center justify-center gap-4 mt-[2.5rem] max-md:mt-6 max-md:gap-[0.375rem]'>
                <DefaultButton
                  asChild
                  size='sm'
                  className='min-w-[7rem] bg-primary-500 max-md:min-w-[4.375rem] max-md:bg-primary-300'
                >
                  <Link href='/mypage/information'>프로필 변경</Link>
                </DefaultButton>
                <DefaultButton
                  asChild
                  size='sm'
                  className='min-w-[7rem] bg-primary-500 max-md:min-w-20 max-md:bg-primary-300'
                >
                  <Link href='/mypage/change-password'>비밀번호 변경</Link>
                </DefaultButton>
              </div>
            </div>
          </div>
          <div className='flex max-md:hidden items-center justify-center gap-4 mt-auto pt-[2.5rem] text-center'>
            <DefaultButton
              variant='text'
              className='text-white'
              onClick={handleDeleteUser}
            >
              회원탈퇴
            </DefaultButton>

            <DefaultButton
              variant='text'
              className='text-white'
              onClick={handleSignout}
            >
              로그아웃
            </DefaultButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default MypageProfile;

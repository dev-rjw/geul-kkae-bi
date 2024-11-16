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
      confirmButtonText: '탈퇴',
      showCancelButton: true,
      cancelButtonText: '취소',
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
      <div className='flex flex-col items-stretch min-w-[21.75rem] w-full lg:w-1/3 px-[2.375rem] py-8 bg-primary-400 rounded-3xl text-white'>
        <div className='flex justify-center mb-[2.5rem]'>
          <LineTitle
            className='text-[2rem] text-primary-50'
            lineClassName='bg-[#488CEE]'
          >
            MY PAGE
          </LineTitle>
        </div>

        <Avatar
          src={user?.image}
          size='17rem'
          className='w-[17rem] h-[17rem]'
        />
        <div className='mt-[2.5rem] text-center'>
          <h2 className='text-[1.75rem] font-bold'>{user?.nickname ? user?.nickname : '닉네임'}</h2>
          <p className='text-[1.25rem] font-bold text-primary-200 mt-2'>{user?.email ? user?.email : '@email.com'}</p>
          <p className='text-[1.25rem] font-bold text-primary-100 mt-[1.125rem]'>
            {user?.introduction?.trim() ? user?.introduction?.trim() : '한 줄 소개가 없습니다.'}
          </p>
        </div>
        <div className='flex items-center justify-center gap-4 mt-[2.5rem]'>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-[7rem] bg-primary-500'
          >
            <Link href='/mypage/information'>프로필 변경</Link>
          </DefaultButton>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-[7rem] bg-primary-500'
          >
            <Link href='/mypage/change-password'>비밀번호 변경</Link>
          </DefaultButton>
        </div>
        <div className='flex items-center justify-center gap-4 mt-auto pt-[2.5rem] text-center'>
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
    </>
  );
};

export default MypageProfile;

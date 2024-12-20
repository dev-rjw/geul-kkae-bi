'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUserInfoByEmail, fetchProfile, saveProfile, updateUserInfo } from '@/utils/user/client-action';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/queries/useAuth';
import { changeProfileSchema } from '@/schemas/changeProfileSchema';
import { User } from '@/types/mypage';
import { Camera, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import DefaultButton from '@/components/DefaultButton';
import Avatar from '@/components/Avatar';
import DefaultInput from '@/components/DefaultInput';

const ChangeProfile = () => {
  const [user, setUser] = useState<User>();
  const { data } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentNickname = user?.nickname || '';
  const form = useForm({
    resolver: zodResolver(changeProfileSchema(currentNickname)),
    defaultValues: {
      nickname: currentNickname,
      introduction: user?.introduction || '',
    },
  });
  const { setValue } = form;

  const fetchUserInfo = async () => {
    const email = data?.user_metadata.email;
    const info = await fetchCurrentUserInfoByEmail(email);

    setUser(info);

    if (info) {
      setValue('nickname', info.nickname || '');
      setValue('introduction', info.introduction || '');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const uploadImgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = await saveProfile(file!);
    const fullpath = await fetchProfile(name.toString());
    setUser((prev) => prev && { ...prev, image: fullpath.publicUrl });
  };

  const onSubmit = async (values: FieldValues) => {
    if (user) {
      const updatedUser = {
        ...user,
        nickname: values.nickname,
        introduction: values.introduction,
      };

      updateUserInfo(user.user_id, updatedUser.image, updatedUser.nickname, updatedUser.introduction);

      const email = data?.user_metadata.email;
      queryClient.invalidateQueries({ queryKey: ['users', email] });

      router.push('/mypage');
    }
  };

  return (
    <>
      <div className='flex items-center gap-[3.25rem]'>
        <div className='relative'>
          <Avatar
            src={user?.image}
            size='11rem'
            className='mx-auto w-[11rem] h-[11rem] max-md:w-[7.875rem] max-md:h-[7.875rem]'
            style={{ boxShadow: '0 0 8px rgba(0,0,0,0.25)' }}
          />
          <button
            className='absolute top-0 right-0 flex items-center justify-center w-10 h-10 bg-primary-300 rounded-full max-md:w-7 max-md:h-7'
            onClick={() =>
              setUser(
                (prev) =>
                  prev && {
                    ...prev,
                    image: `${process.env.NEXT_PUBLIC_SUPABASE_API_URL}/storage/v1/object/public/profile/default_img.webp`,
                  },
              )
            }
          >
            <X className='text-primary-50 max-md:w-4 max-md:h-4' />
          </button>
        </div>

        <div>
          <div>
            <Input
              id='picture'
              type='file'
              className='hidden'
              accept='image/png, image/jpeg'
              onChange={(e) => uploadImgHandler(e)}
            />
            <label
              htmlFor='picture'
              className='flex items-center justify-center gap-2 w-[10rem] h-[2.75rem] border-2 border-gray-300 text-gray-400 rounded-full cursor-pointer max-md:w-[7.25rem] max-md:h-8 max-md:border-[1px]'
            >
              <span className='body-18 max-md:text-sm'>사진 업로드</span>
              <Camera className='max-md:w-4 max-md:h-4' />
            </label>
          </div>
          <p className='body-16 text-gray-300 mt-4 max-md:text-xs max-md:mt-3'>
            사진은 240px X 240px 이상,
            <br /> PNG or JPG 파일로 업로드해주세요
          </p>
        </div>
      </div>

      <div className='h-2 bg-white border-t-2 border-gray-200 mt-10 mb-[3.125rem] max-md:h-[0.375rem] max-md:border-t-1 max-md:my-7' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='form-items'>
            <div className='form-item'>
              <div className='form-label'>
                <div className='form-title'>닉네임</div>
              </div>
              <div className='form-field'>
                <FormField
                  control={form.control}
                  name='nickname'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DefaultInput
                          type='text'
                          maxLength={8}
                          {...field}
                          placeholder='닉네임을 입력해주세요'
                        />
                      </FormControl>
                      <FormMessage className='form-message' />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='form-item'>
              <div className='form-label'>
                <div className='form-title'>한 줄 소개</div>
              </div>
              <div className='form-field'>
                <FormField
                  control={form.control}
                  name='introduction'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DefaultInput
                          type='text'
                          maxLength={16}
                          placeholder='한 줄 소개를 입력해주세요'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='form-message' />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <hr className='border-t-1 border-gray-200 mt-3 mb-[3.125rem] max-md:hidden' />
          <div className='flex justify-center mt-[3.125rem]'>
            <DefaultButton className='w-full max-w-[15rem] max-md:max-w-none'>저장하기</DefaultButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ChangeProfile;

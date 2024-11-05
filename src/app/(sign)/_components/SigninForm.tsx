'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signin } from '@/utils/auth/client-action';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { translateErrorMessage } from '@/schemas/commonSchema';
import { signinSchema } from '@/schemas/signSchema';
import Swal from 'sweetalert2';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import DefaultButton from '@/components/DefaultButton';
import DefaultInput from '@/components/DefaultInput';
import PasswordInput from '@/components/PasswordInput';
import { LockKeyhole, UserRound } from 'lucide-react';
import Link from 'next/link';

const SigninForm = () => {
  const router = useRouter();

  // 유효성 검사
  const defaultValues = {
    // 컴포넌트가 브라우저에서만 렌더링되는지 확인하는 조건문을 추가
    email: typeof window !== 'undefined' ? localStorage.getItem('rememberedEmail') || '' : '', // 초기 이메일 값을 로컬 스토리지에서 불러옴
    password: '',
  };

  const form = useForm<z.infer<typeof signinSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues,
  });
  // const { getFieldState, setValue } = form;
  const { setValue } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email, password, rememberedEmail } = values;
    const result = await signin({ email, password });

    // rememberedEmail가 체크된 경우 이메일을 저장, 아니면 삭제
    if (rememberedEmail) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    if (result instanceof Error) {
      Swal.fire(translateErrorMessage(result.message));
    } else {
      router.push('/');
    }
  };

  // 페이지가 로드될 때 로컬 스토리지에서 아이디를 불러옴
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberedEmail', true); // 체크 상태로 설정
    }
  }, [setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <UserRound className='absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-300' />
                  <DefaultInput
                    placeholder='아이디를 입력해주세요'
                    {...field}
                    className='pl-[3.375rem]'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <LockKeyhole className='absolute z-10 left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-300' />
                  <PasswordInput
                    placeholder='비밀번호를 입력해주세요'
                    field={field}
                    inputClassName='px-[3.375rem]'
                    buttonClassName='!pr-5'
                  />
                </div>
              </FormControl>
              <FormMessage />
              {/* {!getFieldState('password').invalid && field.value ? (
                <FormMessage className='text-primary-400'>올바른 비밀번호입니다.</FormMessage>
              ) : (
                <FormMessage />
              )} */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='rememberedEmail'
          render={({ field }) => (
            <div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='rememberedEmail'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label
                  htmlFor='rememberedEmail'
                  className='text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  아이디 기억하기
                </label>
              </div>

              <div className='mt-5'>
                <ul className='w-full flex gap-2 items-center justify-around'>
                  <li>
                    <Link href='/find-password'>비밀번호 찾기</Link>
                  </li>
                  <li>
                    <Link href='/signup'>회원가입</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        />

        <DefaultButton className='w-full'>로그인</DefaultButton>
      </form>
    </Form>
  );
};

export default SigninForm;

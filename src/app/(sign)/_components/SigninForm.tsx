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

  const defaultValues = {
    email: typeof window !== 'undefined' ? localStorage.getItem('rememberedEmail') || '' : '',
    password: '',
  };

  const form = useForm<z.infer<typeof signinSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues,
  });
  const { setValue } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email, password, rememberedEmail } = values;
    const result = await signin({ email, password });

    if (rememberedEmail) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    if (result instanceof Error) {
      Swal.fire({
        html: `<div class="text-gray-700">${translateErrorMessage(result.message)}</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberedEmail', true);
    }
  }, [setValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='relative'>
                    <UserRound className='absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-300' />
                    <DefaultInput
                      placeholder='이메일 아이디를 입력해주세요'
                      {...field}
                      className='pl-[3.375rem] max-w-none'
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
                      className='max-w-none'
                      inputClassName='px-[3.375rem] max-w-none'
                      buttonClassName='!pr-5'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-[0.625rem]'>
          <FormField
            control={form.control}
            name='rememberedEmail'
            render={({ field }) => (
              <div className='flex justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberedEmail'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor='rememberedEmail'
                    className='text-sm font-bold text-gray-500 ml-[0.188rem]] leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    아이디 기억하기
                  </label>
                </div>

                <ul className='signin-button-group'>
                  <li>
                    <Link
                      href='/find-password'
                      className='caption-14 text-gray-300 hover:text-gray-400 transition-colors'
                    >
                      비밀번호 찾기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/signup'
                      className='caption-14 text-gray-300 hover:text-gray-400 transition-colors'
                    >
                      회원가입
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          />
        </div>

        <div className='mt-7'>
          <DefaultButton className='w-full'>로그인</DefaultButton>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;

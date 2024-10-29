'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signin } from '@/util/auth/client-action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { translateErrorMessage } from '@/schemas/commonSchema';
import { signinSchema } from '@/schemas/signSchema';
import { Checkbox } from '@/components/ui/checkbox';

const SigninForm = () => {
  const router = useRouter();

  // 유효성 검사
  const defaultValues = {
    email: localStorage.getItem('rememberedEmail') || '', // 초기 이메일 값을 로컬 스토리지에서 불러옴
    password: '',
  };

  const form = useForm<z.infer<typeof signinSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues,
  });
  const { getFieldState, setValue } = form;

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
      alert(translateErrorMessage(result.message));
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
                <Input
                  placeholder='이메일'
                  {...field}
                />
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
                <Input
                  type='password'
                  placeholder='비밀번호'
                  {...field}
                />
              </FormControl>
              {!getFieldState('password').invalid && field.value ? (
                <FormMessage className='text-primary-400'>올바른 비밀번호입니다.</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='rememberedEmail'
          render={({ field }) => (
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
          )}
        />

        <Button>로그인</Button>
      </form>
    </Form>
  );
};

export default SigninForm;
'use client';

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

const SigninForm = () => {
  const router = useRouter();

  // 유효성 검사
  const defaultValues = {
    email: '',
    password: '',
  };

  const form = useForm<z.infer<typeof signinSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues,
  });
  const { getFieldState } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values;
    const result = await signin({ email, password });

    if (result instanceof Error) {
      alert(translateErrorMessage(result.message));
    } else {
      router.push('/');
    }
  };

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

        <Button>로그인</Button>
      </form>
    </Form>
  );
};

export default SigninForm;

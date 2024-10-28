'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schemas/findSchema';
import { Button } from '@/components/ui/button';
import { changePassword } from '@/util/auth/client-action';

const ChangePasswordForm = () => {
  // 유효성 검사
  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    mode: 'onChange',
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });
  const { getFieldState } = form;

  const onSubmit = async (values: FieldValues) => {
    console.log(values);

    // const { password } = values;

    /* 2단계: 사용자가 귀하의 애플리케이션으로 다시 리디렉션되면,
    사용자에게 비밀번호를 재설정하도록 요청하세요. */
    changePassword();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
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
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='password'
                  placeholder='비밀번호 확인'
                  {...field}
                />
              </FormControl>
              {!getFieldState('confirmPassword').invalid && field.value ? (
                <FormMessage className='text-primary-400'>비밀번호가 일치합니다.</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <Button>비밀번호 변경</Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;

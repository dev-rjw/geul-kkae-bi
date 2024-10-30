'use client';

import { useRouter } from 'next/navigation';
import { signup } from '@/util/auth/client-action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import EmailInput from './EmailInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { translateErrorMessage } from '@/schemas/commonSchema';
import { signupSchema } from '@/schemas/signSchema';
import PasswordInput from '@/components/PasswordInput';

const SignupForm = () => {
  const router = useRouter();

  // 유효성 검사
  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    agreeToTerms: false,
  };

  const form = useForm<z.infer<typeof signupSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues,
  });
  const { getFieldState } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email, password, nickname } = values;

    const result = await signup({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

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
          name='agreeToTerms'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <Checkbox
                    id='agreeToTerms'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor='agreeToTerms'>[필수] 글깨비 이용약관 동의</label>
                </>
              </FormControl>
              <FormDescription>글깨비 이용약관이 들어갑니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EmailInput
                  field={field}
                  domainOptions={['gmail.com', 'naver.com', '직접 입력']}
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
                <PasswordInput
                  placeholder='비밀번호'
                  field={field}
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
                <PasswordInput
                  placeholder='비밀번호 확인'
                  field={field}
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

        <FormField
          control={form.control}
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  placeholder='사용하실 닉네임'
                  {...field}
                />
              </FormControl>
              {!getFieldState('nickname').invalid && field.value ? (
                <FormMessage className='text-primary-400'>사용 가능한 닉네임입니다.</FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <Button>회원가입</Button>
      </form>
    </Form>
  );
};

export default SignupForm;

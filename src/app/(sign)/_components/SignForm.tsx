'use client';

import { usePathname, useRouter } from 'next/navigation';
import { signin, signup } from '@/util/auth/client-action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import EmailInput from './EmailInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { signinSchema, signupSchema, translateErrorMessage } from '@/schemas/signSchema';

const SignForm = () => {
  const path = usePathname();
  const router = useRouter();

  // 유효성 검사
  const isSignUp = path === '/signup'; // 회원가입일때
  const selectedSchema = isSignUp ? signupSchema : signinSchema;
  const defaultValues = isSignUp
    ? {
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
      }
    : {
        email: '',
        password: '',
      };
      
  const form = useForm<z.infer<typeof selectedSchema>>({
    resolver: zodResolver(selectedSchema),
    defaultValues,
  });
  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values;

    if (isSignUp) {
      // 회원가입일때
      const { confirmPassword, nickname } = values;

      // 비밀번호 확인
      if (password !== confirmPassword) {
        setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' });
        return;
      }

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
    } else {
      // 로그인일때
      const result = await signin({ email, password });

      if (result instanceof Error) {
        alert(translateErrorMessage(result.message));
      } else {
        router.push('/');
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        {/* S: 회원가입일때 */}
        {isSignUp && (
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
        )}
        {/* E: 회원가입일때 */}

        {/* S: 로그인일때 */}
        {path === '/signin' && (
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
        )}
        {/* E: 로그인일때 */}

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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* S: 회원가입일때 */}
        {isSignUp && (
          <>
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
                  <FormMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormMessage>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {/* E: 회원가입일때 */}

        <Button>{isSignUp ? '가입하기' : '로그인'}</Button>
      </form>
    </Form>
  );
};

export default SignForm;

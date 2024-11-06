'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schemas/findSchema';
import { Button } from '@/components/ui/button';
import { changePassword } from '@/utils/auth/client-action';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import PasswordValidationInput from '@/components/PasswordValidationInput';

const ChangePasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();

  const error = params.get('error');

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
  const { getFieldState, watch } = form;
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (values: FieldValues) => {
    const { password } = values;
    const success = await changePassword(password); // 변경 결과를 확인

    if (success) {
      router.push('/'); // 비밀번호 변경 성공 시에만 이동
    }
  };

  return (
    <>
      {error ? (
        <div>
          <p>비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다.</p>
          <Link href='/find-password'>돌아가기</Link>
        </div>
      ) : (
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
                    <PasswordValidationInput
                      placeholder='비밀번호'
                      field={field}
                    />
                  </FormControl>
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
                  {passwordValue === confirmPasswordValue &&
                  !getFieldState('confirmPassword').invalid &&
                  passwordValue !== '' &&
                  field.value !== '' ? (
                    <div className='caption-14 text-primary-400'>비밀번호가 일치합니다.</div>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button>비밀번호 변경</Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ChangePasswordForm;

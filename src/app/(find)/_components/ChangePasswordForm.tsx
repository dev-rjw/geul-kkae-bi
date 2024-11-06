'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schemas/findSchema';
import { changePassword } from '@/utils/auth/client-action';
import Link from 'next/link';
import PasswordInput from '@/components/PasswordInput';
import PasswordValidationInput from '@/components/PasswordValidationInput';
import DefaultButton from '@/components/DefaultButton';

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
          <p className='body-20 text-center text-gray-700 mb-10'>
            비밀번호 변경을 위한 이메일 링크가 <br />
            유효하지 않거나 만료 되었어요.
            <br />
            다시 시도해주세요!
          </p>
          <hr className='border-t-1 border-gray-200 my-[3.125rem]' />
          <div className='flex justify-center mt-[3.125rem]'>
            <DefaultButton
              asChild
              className='w-full max-w-[15rem]'
            >
              <Link href='/find-password'>확인</Link>
            </DefaultButton>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='form-items'>
              <div className='form-item'>
                <div className='form-label'>
                  <div className='form-title'>
                    비밀번호
                    <span className='form-dot' />
                  </div>
                </div>
                <div className='form-field'>
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
                </div>
              </div>

              <div className='form-item'>
                <div className='form-label'>
                  <div className='form-title'>
                    비밀번호 확인
                    <span className='form-dot' />
                  </div>
                </div>
                <div className='form-field'>
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
                </div>
              </div>
            </div>

            <hr className='border-t-1 border-gray-200 my-[3.125rem]' />
            <div className='flex justify-center mt-[3.125rem]'>
              <DefaultButton className='w-full max-w-[15rem]'>변경하기</DefaultButton>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default ChangePasswordForm;

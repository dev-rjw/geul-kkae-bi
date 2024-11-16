'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import Swal from 'sweetalert2';
import { translateErrorMessage } from '@/schemas/commonSchema';

const ChangePasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const error = params.get('error');

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
    const result = await changePassword(password);

    if (result instanceof Error) {
      const errorMessage = result.message || '알 수 없는 오류가 발생했습니다.';

      Swal.fire({
        html: `<div class="text-gray-700">${translateErrorMessage(errorMessage)}</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });
    } else {
      Swal.fire({
        html: `<div class="text-gray-700">비밀번호 변경 완료!</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });

      router.push('/');
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
                    {pathname === '/mypage/change-password' && '새 '}비밀번호
                    <span className='form-dot' />
                  </div>
                </div>
                <div className='form-field'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => {
                      const fieldState = getFieldState('password');
                      return (
                        <FormItem>
                          <FormControl>
                            <PasswordValidationInput
                              placeholder='비밀번호를 입력해주세요'
                              inputClassName={`
                            ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}
                            ${!fieldState.invalid && field.value ? 'border-primary-400' : ''}
                          `}
                              field={field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <div className='form-item'>
                <div className='form-label'>
                  <div className='form-title'>
                    {pathname === '/mypage/change-password' && '새 '}비밀번호 확인
                    <span className='form-dot' />
                  </div>
                </div>
                <div className='form-field'>
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => {
                      const fieldState = getFieldState('confirmPassword');
                      return (
                        <FormItem>
                          <FormControl>
                            <PasswordInput
                              placeholder='한 번 더 비밀번호를 입력해주세요'
                              inputClassName={`
                            ${passwordValue === confirmPasswordValue ? 'border-gray-300' : 'border-red-500'}
                            ${!fieldState.invalid && field.value ? 'border-primary-400' : ''}
                          `}
                              field={field}
                            />
                          </FormControl>
                          {passwordValue && confirmPasswordValue ? (
                            passwordValue === confirmPasswordValue ? (
                              <div className='form-message text-primary-400'>비밀번호가 일치합니다.</div>
                            ) : (
                              <FormMessage className='form-message' />
                            )
                          ) : null}
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <hr className='border-t-1 border-gray-200 mt-[2.5rem] mb-[3.125rem]' />
            <div className='flex justify-center mt-[3.125rem]'>
              <DefaultButton className='w-full max-w-[15rem]'>확인</DefaultButton>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default ChangePasswordForm;

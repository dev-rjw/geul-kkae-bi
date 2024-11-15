'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { findPasswordSchema } from '@/schemas/findSchema';
import { findPassword } from '@/utils/auth/client-action';
import DefaultButton from '@/components/DefaultButton';
import EmailInput from '@/components/EmailInput';
import { fetchCurrentUserInfoByEmail } from '@/utils/user/client-action';
import Swal from 'sweetalert2';

const FindPasswordForm = () => {
  const defaultValues = {
    email: '',
  };

  const form = useForm<z.infer<typeof findPasswordSchema>>({
    mode: 'onChange',
    resolver: zodResolver(findPasswordSchema),
    defaultValues,
  });

  const onSubmit = async (values: FieldValues) => {
    const { email } = values;

    const user = await fetchCurrentUserInfoByEmail(email);

    if (user?.provider === 'google' || user?.provider === 'kakao') {
      Swal.fire({
        html: `<div class="text-gray-700">해당 계정은 ${user?.provider} <br />소셜 로그인으로 가입되었습니다. <br />${user?.provider} 계정으로 로그인해주세요.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
        },
        showConfirmButton: false,
        footer: `<a href="/signin" class='swal-custom-button'>로그인하기</a>`,
      });
    } else {
      const result = await findPassword(email);

      if (result instanceof Error) {
        Swal.fire({
          html: `<div class="text-gray-700">해당 이메일로 비밀번호 <br/>변경링크를 보내드렸어요!</div>`,
          customClass: {
            title: 'swal-custom-title',
            htmlContainer: 'swal-custom-text',
            confirmButton: 'swal-custom-button',
          },
          confirmButtonText: '확인',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col'
      >
        <div className='w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <EmailInput
                    field={field}
                    domainOptions={['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'hotmail.com', '직접 입력']}
                  />
                </FormControl>
                <FormMessage className='text-sm font-bold' />
              </FormItem>
            )}
          />
        </div>

        <hr className='border-t-1 border-gray-200 my-[3.125rem]' />
        <div className='flex justify-center mt-[3.125rem]'>
          <DefaultButton className='w-full max-w-[15rem]'>메일 받기</DefaultButton>
        </div>
      </form>
    </Form>
  );
};

export default FindPasswordForm;

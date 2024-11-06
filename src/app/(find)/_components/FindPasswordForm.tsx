'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { findPasswordSchema } from '@/schemas/findSchema';
import { findPassword } from '@/utils/auth/client-action';
import DefaultButton from '@/components/DefaultButton';
import EmailInput from '@/components/EmailInput';

const FindPasswordForm = () => {
  // 유효성 검사
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
    findPassword(email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col'
      >
        <div className='w-full max-w-[46rem] mx-auto'>
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
                <FormMessage className='text-sm font-bold' />
              </FormItem>
            )}
          />
        </div>

        <hr className='border-t-1 border-gray-200 my-[3.125rem]' />
        <div className='flex justify-center mt-[3.125rem]'>
          <DefaultButton className='w-full max-w-[15rem]'>비밀번호 찾기</DefaultButton>
        </div>
      </form>
    </Form>
  );
};

export default FindPasswordForm;

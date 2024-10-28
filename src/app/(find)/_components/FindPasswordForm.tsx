'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { findPasswordSchema } from '@/schemas/findSchema';
import { Button } from '@/components/ui/button';
import { findPassword } from '@/util/auth/client-action';

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

        <Button>비밀번호 찾기</Button>
      </form>
    </Form>
  );
};

export default FindPasswordForm;

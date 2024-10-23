'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { signin, signup } from '@/util/supabase/client-action';

const SignupForm = () => {
  const path = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (path === '/signup' && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (path === '/signup') {
      // 회원가입
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
        setError(result.message);
      } else {
        router.push('/');
      }
    } else {
      // 로그인
      const result = await signin({ email, password });

      if (result instanceof Error) {
        setError(result.message);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
    >
      <Input
        type='email'
        placeholder='이메일'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {path === '/signup' && (
        <>
          <Input
            type='password'
            placeholder='비밀번호 확인'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            type='text'
            placeholder='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </>
      )}
      {error && <p className='text-red-500'>{error}</p>}
      <Button>{path === '/signup' ? '가입하기' : '로그인'}</Button>
    </form>
  );
};

export default SignupForm;

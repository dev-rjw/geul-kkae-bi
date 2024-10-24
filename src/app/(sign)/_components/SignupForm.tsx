'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { signin, signup } from '@/util/supabase/client-action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignupForm = () => {
  const path = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 이메일 도메인 목록
  const domainOptions = ['gmail.com', 'naver.com', 'daum.net', '직접 입력'];

  // userId와 domain이 변경될 때 email 값을 업데이트
  useEffect(() => {
    if (userId && domain && domain !== '직접 입력') {
      setEmail(`${userId}@${domain}`);
    } else if (userId && customDomain) {
      setEmail(`${userId}@${customDomain}`);
    }
  }, [userId, domain, customDomain]);
  console.log(email);

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
      {path === '/signup' ? (
        <>
          <div className='flex items-center gap-2'>
            <Input
              type='text'
              placeholder='아이디'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <span>@</span>
            <div className='relative'>
              <Select
                value={domain}
                onValueChange={(value) => {
                  setDomain(value);
                  setCustomDomain('');
                  if (value === '직접 입력') {
                    setEmail('');
                  } else if (userId && value) {
                    setEmail(`${userId}@${value}`);
                  }
                }}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='도메인 선택' />
                </SelectTrigger>
                <SelectContent>
                  {domainOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {domain === '직접 입력' && (
                <div className='absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-sm'>
                  <Input
                    placeholder='직접 입력'
                    value={customDomain ?? ''}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className='max-w-sm'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                    onClick={() => {
                      setDomain('');
                      setCustomDomain('');
                      setEmail('');
                    }}
                  >
                    X<span className='sr-only'>Clear</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Input
          type='email'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

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

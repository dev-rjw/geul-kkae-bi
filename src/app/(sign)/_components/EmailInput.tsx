'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldValues } from 'react-hook-form';

interface EmailInputProps {
  field: FieldValues;
  domainOptions: string[];
}

const EmailInput = ({ field, domainOptions }: EmailInputProps) => {
  const [userId, setUserId] = useState('');
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [email, setEmail] = useState('');

  // userId와 domain이 변경될 때 email 값을 업데이트
  useEffect(() => {
    if (userId && domain && domain !== '직접 입력') {
      setEmail(`${userId}@${domain}`);
    } else if (userId && customDomain) {
      setEmail(`${userId}@${customDomain}`);
    }
    field.onChange(email); // react-hook-form에 값 반영
  }, [userId, domain, customDomain]);

  return (
    <div className='flex items-center gap-2'>
      <Input
        type='text'
        placeholder='아이디'
        value={userId}
        onChange={(e) => {
          setUserId(e.target.value);
          if (domain && domain !== '직접 입력') {
            setEmail(`${e.target.value}@${domain}`);
          }
        }}
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
  );
};

export default EmailInput;

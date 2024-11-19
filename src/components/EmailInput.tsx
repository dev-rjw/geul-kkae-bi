'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldValues } from 'react-hook-form';
import DefaultInput from './DefaultInput';
import { X } from 'lucide-react';

interface Props {
  field: FieldValues;
  domainOptions: string[];
  inputClassName: string;
}

const EmailInput = ({ field, domainOptions, inputClassName }: Props) => {
  const [userId, setUserId] = useState('');
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userId && domain && domain !== '직접 입력') {
      setEmail(`${userId}@${domain}`);
    } else if (userId && customDomain) {
      setEmail(`${userId}@${customDomain}`);
    }
    field.onChange(email);
  }, [userId, domain, customDomain]);

  return (
    <div className='flex items-center gap-[0.625rem] max-md:gap-1'>
      <DefaultInput
        type='text'
        placeholder='이메일 아이디'
        value={userId}
        className={inputClassName}
        onChange={(e) => {
          setUserId(e.target.value);
          if (domain && domain !== '직접 입력') {
            setEmail(`${e.target.value}@${domain}`);
          }
        }}
      />
      <span className='body-20 text-gray-600 max-md:caption-14 max-md:text-gray-800'>@</span>
      <div className='relative w-full max-w-[21.875rem] max-md:max-w-none'>
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
          <SelectTrigger
            className={`h-[3.25rem] w-full rounded-[0.625rem] px-[0.625rem] py-[0.875rem] text-base font-bold bg-white placeholder:text-gray-300 focus:ring-0 focus:ring-offset-0 max-md:h-11 max-md:text-sm max-md:px-[0.875rem] max-md:py-2 max-md:rounded-sm ${
              !domain ? 'text-gray-300' : 'text-gray-800'
            }`}
          >
            <SelectValue placeholder='선택해주세요' />
          </SelectTrigger>
          <SelectContent className='rounded-[0.625rem] max-md:rounded-sm'>
            {domainOptions.map((option, index) => (
              <SelectItem
                key={index}
                value={option}
                className='text-base font-semibold text-gray-500 rounded-[0.5rem] hover:font-semibold max-md:text-sm max-md:rounded-sm'
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {domain === '직접 입력' && (
          <div className='absolute right-0 top-1/2 -translate-y-1/2 w-full'>
            <DefaultInput
              placeholder='직접 입력'
              value={customDomain ?? ''}
              onChange={(e) => setCustomDomain(e.target.value)}
              className='w-full !pr-11'
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute right-0 top-1/2 -translate-y-1/2 w-auto h-full px-[0.625rem] py-2 hover:bg-transparent'
              onClick={() => {
                setDomain('');
                setCustomDomain('');
                setEmail('');
              }}
            >
              <X className='!w-6 !h-6 text-gray-300' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailInput;

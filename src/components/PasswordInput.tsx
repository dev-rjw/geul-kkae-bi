'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import DefaultInput from './DefaultInput';

interface Props {
  field: FieldValues;
  placeholder: string;
  className?: string | null;
  inputClassName?: string | null;
  buttonClassName?: string | null;
}

const PasswordInput = ({ field, placeholder, className, inputClassName, buttonClassName }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative max-w-[21.875rem] ${className}`}>
      <DefaultInput
        type={showPassword ? 'text' : 'password'}
        maxLength={16}
        placeholder={placeholder}
        className={`pr-11 ${inputClassName}`}
        {...field}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className={`absolute right-0 top-0 w-auto h-full px-[0.625rem] py-2 hover:bg-transparent ${buttonClassName}`}
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className='!h-6 !w-6 text-gray-300' /> : <Eye className='!h-6 !w-6 text-gray-300' />}
      </Button>
    </div>
  );
};

export default PasswordInput;

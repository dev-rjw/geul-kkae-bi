'use client';

import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Check, X } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

interface Props {
  field: FieldValues;
  placeholder: string;
}

const PasswordValidationInput = ({ field, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
  });

  useEffect(() => {
    const { value } = field;
    setValidations({
      minLength: value.length >= 8,
      hasLetter: /[a-zA-Z]/.test(value),
      hasNumber: /\d/.test(value),
    });
  }, [field.value]);

  return (
    <>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          maxLength={16}
          placeholder={placeholder}
          className='pr-10'
          {...field}
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
        </Button>
      </div>
      <div className='flex gap-3 font-bold'>
        <span className='flex items-center gap-1'>
          {validations.hasLetter ? <Check className='text-primary-500' /> : <X className='text-red-500' />}
          영문
        </span>
        <span className='flex items-center gap-1'>
          {validations.hasNumber ? <Check className='text-primary-500' /> : <X className='text-red-500' />}
          숫자
        </span>
        <span className='flex items-center gap-1'>
          {validations.minLength ? <Check className='text-primary-500' /> : <X className='text-red-500' />}
          8자 이상
        </span>
      </div>
    </>
  );
};

export default PasswordValidationInput;

'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Check, X } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import DefaultInput from './DefaultInput';

interface Props {
  field: FieldValues;
  placeholder: string;
  inputClassName?: string | null;
  buttonClassName?: string | null;
}

const PasswordValidationInput = ({ field, placeholder, inputClassName, buttonClassName }: Props) => {
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
      <div className='relative max-w-[21.875rem]'>
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
      <div className='flex gap-[0.375rem] caption-14'>
        <span className='flex items-center gap-[0.25rem]'>
          {validations.hasLetter ? (
            <Check className='w-[0.875rem] h-[0.875rem] text-primary-400' />
          ) : (
            <X className='w-[0.875rem] h-[0.875rem] text-warning-400' />
          )}
          <span className={validations.hasLetter ? 'text-primary-400' : 'text-gray-400'}>영문</span>
        </span>
        <span className='flex items-center gap-[0.25rem]'>
          {validations.hasNumber ? (
            <Check className='w-[0.875rem] h-[0.875rem] text-primary-400' />
          ) : (
            <X className='w-[0.875rem] h-[0.875rem] text-warning-400' />
          )}
          <span className={validations.hasNumber ? 'text-primary-400' : 'text-gray-400'}>숫자</span>
        </span>
        <span className='flex items-center gap-[0.25rem]'>
          {validations.minLength ? (
            <Check className='w-[0.875rem] h-[0.875rem] text-primary-400' />
          ) : (
            <X className='w-[0.875rem] h-[0.875rem] text-warning-400' />
          )}
          <span className={validations.minLength ? 'text-primary-400' : 'text-gray-400'}>8자이상</span>
        </span>
      </div>
    </>
  );
};

export default PasswordValidationInput;

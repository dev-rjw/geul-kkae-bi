'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { FieldValues } from 'react-hook-form';

interface Props {
  field: FieldValues;
  placeholder: string;
}

const PasswordInput = ({ field, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
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
  );
};

export default PasswordInput;

import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DefaultInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <Input
      type={type}
      className={cn(
        'flex h-[3.25rem] w-full max-w-[21.875rem] rounded-[0.625rem] border border-input bg-white text-gray-800 px-[0.625rem] py-[0.875rem] text-base font-bold ring-offset-background file:border-0 file:bg-white file:text-base file:font-bold file:text-primary-800 placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

DefaultInput.displayName = 'DefaultInput';

export default DefaultInput;

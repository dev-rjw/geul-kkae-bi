import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type ButtonPrimaryProps = ComponentProps<typeof Button> & {
  size?: 'default' | 'sm';
};

export default function ButtonPrimary({ className, size = 'default', ...props }: ButtonPrimaryProps) {
  return (
    <Button
      className={cn(size === 'default' && 'body-18', size === 'sm' && 'body-16', 'bg-primary-400 text-gray-50 hover:bg-primary-600 disabled:bg-gray-200 disabled:opacity-100', className)}
      size={size}
      {...props}
    />
  );
}

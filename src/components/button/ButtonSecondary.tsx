import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type ButtonSecondaryProps = ComponentProps<typeof Button> & {
  size?: 'default' | 'sm';
};

export default function ButtonSecondary({ className, size = 'default', ...props }: ButtonSecondaryProps) {
  return (
    <Button
      variant='secondary'
      className={cn(size === 'default' && 'body-18', size === 'sm' && 'body-16', 'bg-secondary-400', className)}
      size={size}
      {...props}
    />
  );
}

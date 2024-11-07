import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg font-bold rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-200 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 [&_svg]:text-primary-200 [&_svg]:hover:text-primary-300',
  {
    variants: {
      variant: {
        default: 'bg-primary-400 text-gray-50 hover:bg-primary-600 hover:text-primary-300',
        text: 'bg-transparent text-primary-400 underline-offset-4 underline !h-fit !p-1 hover:bg-transparent disabled:bg-gray-200',
      },
      size: {
        default: 'h-[3.25rem] px-4 py-2.5',
        sm: 'h-10 px-4 py-2 text-base',
        lg: 'h-14 px-4 py-3',
        icon: 'h-[3.25rem] w-[3.25rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const DefaultButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      />
    );
  },
);

DefaultButton.displayName = 'DefaultButton';

export default DefaultButton;

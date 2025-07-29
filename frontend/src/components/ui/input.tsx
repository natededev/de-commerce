// input: UI component for input fields

import * as React from 'react';

import { cn } from '@/lib/utils';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, autoComplete, ...props }, ref) => {
  return (
    <input
      type={type}
      autoComplete={autoComplete ?? 'on'}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputComponent.displayName = 'Input';

export const Input = React.memo(InputComponent);

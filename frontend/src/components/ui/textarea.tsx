// textarea: UI component for textarea fields

import * as React from 'react';

import { cn } from '@/lib/utils';

const TextareaComponent = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, autoComplete, ...props }, ref) => {
  return (
    <textarea
      autoComplete={autoComplete ?? 'on'}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextareaComponent.displayName = 'Textarea';

export const Textarea = React.memo(TextareaComponent);

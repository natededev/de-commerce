// AuthForm: Authentication form component for login and registration

import React from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthForm } from '@/features/auth/hooks/use-auth-form';
import type { FieldError } from 'react-hook-form';

interface AuthFormProps {
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
  onDemoFill?: (fill: (email: string, password: string) => void) => void; // <-- add this
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onModeChange,
  onDemoFill,
}) => {
  const {
    showPassword,
    setShowPassword,
    formRegister,
    handleSubmit,
    errors,
    setValue, // <-- now available
    onSubmit,
    isLoading,
  } = useAuthForm(mode);

  // Expose a fill function to parent for demo autofill
  React.useEffect(() => {
    if (onDemoFill) {
      onDemoFill((email: string, password: string) => {
        setValue('email', email, { shouldValidate: true });
        setValue('password', password, { shouldValidate: true });
      });
    }
  }, [onDemoFill, setValue]);

  function isFieldError(error: unknown): error is FieldError {
    return (
      error !== null &&
      typeof error === 'object' &&
      'message' in (error as FieldError)
    );
  }

  return (
    <Card className="w-full max-w-md">
      {/* Show root error if present */}
      {errors && 'root' in errors && errors.root && (
        <div className="text-red-600 text-sm px-4 pt-4" role="alert">
          {isFieldError(errors.root) ? errors.root.message : String(errors.root)}
        </div>
      )}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'login'
            ? 'Enter your credentials to sign in'
            : 'Enter your details to create your account'}
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-live="polite"
        autoComplete="on"
      >
        <CardContent className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  {...formRegister('name')}
                  className="pl-9"
                  aria-invalid={
                    mode === 'register' && !!(errors && 'name' in errors)
                  }
                  aria-describedby="name-error"
                  required
                />
              </div>
              {mode === 'register' &&
                errors &&
                'name' in errors &&
                isFieldError(errors.name) && (
                  <p
                    className="text-xs text-destructive mt-1"
                    id="name-error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.name.message as string}
                  </p>
                )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...formRegister('email')}
                className="pl-9"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                required
              />
            </div>
            {errors.email && (
              <p
                className="text-xs text-destructive mt-1"
                id="email-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete="current-password"
                {...formRegister('password')}
                className="pl-9 pr-9"
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                className="text-xs text-destructive mt-1"
                id="password-error"
                role="alert"
                aria-live="assertive"
              >
                {errors.password.message as string}
              </p>
            )}
          </div>
          {errors.root && (
            <div
              className="text-xs text-destructive text-center mt-2"
              role="alert"
              aria-live="assertive"
            >
              {errors.root.message as string}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full text-center text-xs"
            onClick={() =>
              onModeChange(mode === 'login' ? 'register' : 'login')
            }
            tabIndex={0}
          >
            {mode === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Sign in'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

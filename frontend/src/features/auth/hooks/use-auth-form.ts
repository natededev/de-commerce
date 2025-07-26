// useAuthForm: Custom hook for authentication form logic and validation (login/register)

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name is required'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

type Mode = 'login' | 'register';

export function useAuthForm(mode: Mode) {
  const [showPassword, setShowPassword] = React.useState(false);
  const { login, register, isLoading, error } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<LoginForm | RegisterForm>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: LoginForm | RegisterForm) => {
    try {
      if (mode === 'login') {
        await login({ email: data.email, password: data.password });
        toast({ title: 'Login successful', description: 'Welcome back!' });
      } else {
        // Submit registration
        if (data.email && data.password && 'name' in data && data.name) {
          const registerData = {
            email: data.email,
            password: data.password,
            name: data.name,
          };
          const result = await register(registerData);
          
          // Check if email confirmation is required
          if (!result.token) {
            toast({ 
              title: 'Registration successful!', 
              description: 'Please check your email and click the confirmation link to activate your account.' 
            });
          } else {
            toast({ title: 'Account created', description: 'Welcome!' });
          }
        }
      }
      reset();
    } catch (err: unknown) {
      // Log the full error for debugging
       
      console.error('Auth error:', err);
      let message = 'Authentication failed';
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        message = (err as { message: string }).message;
      } else {
        message = JSON.stringify(err);
      }
      setError('root', { message });
    }
  };

  return {
    showPassword,
    setShowPassword,
    formRegister,
    handleSubmit,
    errors,
    setError,
    reset,
    setValue,
    onSubmit,
    isLoading,
    error,
  };
}

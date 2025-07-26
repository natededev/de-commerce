/**
 * Authentication Context Provider
 *
 * Manages global authentication state and provides authentication-related
 * functions throughout the application. This context handles:
 * - User session management and persistence
 * - Login, register, and logout operations
 * - Token validation and automatic session restoration
 * - Loading states and error handling for auth operations
 *
 * The provider automatically checks for existing sessions on mount
 * and provides a centralized way to manage user authentication state.
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '@/types';
import { toast } from '@/lib/toast';
import { AuthContext } from './auth-context';
import {
  login as loginService,
  register as registerService,
  validateToken as validateTokenService,
  logout as logoutService,
} from '@/features/auth/services/auth-service';

/**
 * AuthProvider Component
 *
 * Wraps the application with authentication context and provides
 * authentication state and methods to all child components.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Session Restoration Effect
   *
   * Checks for existing authentication token on component mount
   * and validates it with the backend to restore user session.
   */
  useEffect(() => {
    setIsLoading(true);
    validateTokenService().then(user => {
      if (user) setUser(user);
      setIsLoading(false);
    });
  }, []);

  /**
   * Login Function
   *
   * Handles user login with credentials, stores the authentication token,
   * and updates the user state. Provides user feedback via toast notifications.
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await loginService(credentials);
      setUser(user);
      toast('Welcome back! You have successfully logged in.');
    } catch (err) {
      setError('Login failed');
      toast.error('Login failed. Please check your credentials and try again.');
      if (import.meta.env.DEV) {
        console.error('AuthContext login error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register Function
   *
   * Handles user registration with credentials. If email confirmation is required,
   * the user will not be logged in automatically and must confirm their email first.
   */
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token } = await registerService(credentials);
      
      // If token is provided, user is immediately authenticated
      if (token) {
        setUser(user);
        toast.success('Account created! Welcome to our store.');
      } else {
        // Email confirmation required - user is not logged in yet
        toast.success('Account created! Please check your email to confirm your account.');
      }
      
      return { user, token };
    } catch (err) {
      setError('Registration failed');
      toast.error('Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout Function
   *
   * Clears the user session, removes the authentication token,
   * and resets the user state. Provides user feedback via toast notifications.
   */
  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch {
      // Don't throw error - user should still be logged out locally
    }
    setUser(null);
    setError(null);
    toast('You have been successfully logged out.');
  }, []);

  /**
   * Context Value
   *
   * Memoized context value to prevent unnecessary re-renders
   * of consuming components when the context hasn't changed.
   */
  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      register,
      logout,
    }),
    [user, isLoading, error, login, register, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Authentication Service - Backend API Integration
 *
 * Provides authentication-related API functions for user management.
 * This service handles:
 * - User login and registration
 * - Token validation and session management
 * - Logout functionality
 *
 * The service provides authentication functionality by communicating
 * with the backend API for user management and session handling.
 */

import { User, LoginCredentials, RegisterCredentials } from '@/types';
import { supabase } from '@/lib/supabaseClient';

/**
 * Error Logging Utility
 *
 * Centralized error logging that respects environment settings.
 * In development, logs to console. In production, could be sent to
 * error tracking services.
 */

/**
 * Validate Authentication Token (Supabase session restore)
 *
 * Checks if a Supabase session exists and returns the user if valid.
 */
export async function validateToken(): Promise<User | null> {
  const session = supabase.auth.getSession ? (await supabase.auth.getSession()).data.session : null;
  if (session && session.user) {
    return {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name || '',
      role: session.user.user_metadata?.role || 'USER',
      createdAt: session.user.created_at,
      updatedAt: session.user.updated_at || session.user.created_at,
    };
  }
  return null;
}

/**
 * User Login (Supabase)
 */
export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
  if (error || !data.session || !data.user) {
    throw new Error(error?.message || 'Login failed');
  }
  const user: User = {
    id: data.user.id,
    email: data.user.email || '',
    name: data.user.user_metadata?.name || '',
    role: data.user.user_metadata?.role || 'USER',
    createdAt: data.user.created_at,
    updatedAt: data.user.updated_at || data.user.created_at,
  };
  return { user, token: data.session.access_token };
}

/**
 * User Registration (Supabase)
 */
export async function register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: { name: credentials.name, role: 'USER' },
    },
  });
  if (error || !data.user) {
    throw new Error(error?.message || 'Registration failed');
  }
  
  // Handle case where email confirmation is required
  if (!data.session) {
    // If no session, user needs to confirm their email
    const user: User = {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || '',
      role: data.user.user_metadata?.role || 'USER',
      createdAt: data.user.created_at,
      updatedAt: data.user.updated_at || data.user.created_at,
    };
    // Return empty token since user needs to confirm email first
    return { user, token: '' };
  }
  
  const user: User = {
    id: data.user.id,
    email: data.user.email || '',
    name: data.user.user_metadata?.name || '',
    role: data.user.user_metadata?.role || 'USER',
    createdAt: data.user.created_at,
    updatedAt: data.user.updated_at || data.user.created_at,
  };
  return { user, token: data.session.access_token };
}

/**
 * User Logout (Supabase)
 */
export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}

import bcrypt from 'bcryptjs';
import { supabase } from '../config/database.js';
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from '../types/index.js';

export class AuthService {
  static async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    const { email, password, name } = credentials;
    console.log('AuthService: Starting registration for:', email);

    // Check if user already exists
    const { data: existingUsers, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
    
    console.log('AuthService: Checking existing users result:', { 
      existingUsers: existingUsers?.length || 0,
      error: findError ? findError.message : null 
    });

    if (findError) {
      console.error('AuthService: Error checking existing user:', findError);
      throw findError;
    }
    if (existingUsers && existingUsers.length > 0) {
      console.log('AuthService: User already exists:', email);
      throw new Error('User already exists with this email');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    console.log('AuthService: Creating new user with hashed password');
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, name, role: 'USER' }])
      .select('*')
      .single();
    
    if (createError) {
      console.error('AuthService: Error creating user:', createError);
      throw createError;
    }
    console.log('AuthService: User created successfully:', user.id);

    // Convert dates to strings and remove password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    const userWithStringDates: User = {
      ...userWithoutPassword,
      createdAt: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: user.updatedAt
        ? new Date(user.updatedAt).toISOString()
        : new Date().toISOString(),
    };

    return {
      user: userWithStringDates,
    };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials;

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    console.log('AuthService: Login successful for:', email);

    // Return user without password and convert dates
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    const userWithStringDates: User = {
      ...userWithoutPassword,
      createdAt: userWithoutPassword.createdAt
        ? new Date(userWithoutPassword.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: userWithoutPassword.updatedAt
        ? new Date(userWithoutPassword.updatedAt).toISOString()
        : new Date().toISOString(),
    };

    return {
      user: userWithStringDates,
    };
  }

  static async getCurrentUser(userId: string): Promise<User> {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, createdAt, updatedAt')
      .eq('id', userId)
      .single();
    if (error || !user) {
      throw new Error('User not found');
    }
    return {
      ...user,
      createdAt: user.createdAt
        ? new Date(user.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: user.updatedAt
        ? new Date(user.updatedAt).toISOString()
        : new Date().toISOString(),
    };
  }

  static async updateProfile(
    userId: string,
    updates: Partial<Pick<User, 'name' | 'email'>>
  ): Promise<User> {
    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id, email, name, role, createdAt, updatedAt')
      .single();
    if (error || !user) {
      throw new Error('User not found');
    }
    return {
      ...user,
      createdAt: new Date(user.createdAt).toISOString(),
      updatedAt: new Date(user.updatedAt).toISOString(),
    };
  }

  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    // Get user with password
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error || !user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    const { error: updateError } = await supabase
      .from('users')
      .update({ password: hashedNewPassword })
      .eq('id', userId);
    if (updateError) throw updateError;
  }
}

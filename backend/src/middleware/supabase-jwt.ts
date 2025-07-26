
// Supabase JWT verification using JWKS Discovery URL and jose
import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/index.js';

// Define the expected Supabase JWT payload structure (no 'any')
export interface SupabaseJwtPayload extends JWTPayload {
  sub: string; // user id
  email?: string;
  phone?: string;
  role?: string;
  user_metadata?: {
    name?: string;
    role?: string;
    [key: string]: unknown;
  };
}

// Extend Express Request to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

const JWKS_URL = process.env.SUPABASE_JWKS_URL || 'https://gprxedmaiuwppyyhokrk.supabase.co/auth/v1/.well-known/jwks.json';
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function verifySupabaseJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'Access token required' });
    }
    
    // Verifies and decodes the JWT using the JWKS
    const { payload } = await jwtVerify(token, JWKS, {
      algorithms: ['ES256'],
      issuer: undefined, // Optionally set to your Supabase project URL
    });
    
    // Map Supabase JWT payload to app's User type
    const supabasePayload = payload as SupabaseJwtPayload;
    
    // Extract name and role from user_metadata
    const userMetadata = supabasePayload.user_metadata || {};
    const name = userMetadata.name || '';
    const userRole = userMetadata.role || 'USER';
    
    // Only allow 'USER' or 'ADMIN' for UserRole
    let role: 'USER' | 'ADMIN' = 'USER';
    if (userRole === 'ADMIN') role = 'ADMIN';
    
    const user: User = {
      id: supabasePayload.sub,
      email: supabasePayload.email || '',
      name,
      role,
      createdAt: '', // Not available in JWT, set as empty or fetch from DB if needed
      updatedAt: '', // Not available in JWT, set as empty or fetch from DB if needed
    };
    req.user = user;
    next();
    return;
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

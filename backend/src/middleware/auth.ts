
// Legacy HS256 JWT authentication logic removed. Use supabase-jwt.ts for all authentication.

// requireAdmin middleware for Supabase JWT-based auth
export function requireAdmin(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction): void {
  // This middleware expects req.user to be set by supabase-jwt.ts
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
    return;
  }
  if (req.user.role !== 'ADMIN') {
    res.status(403).json({
      success: false,
      error: 'Admin access required',
    });
    return;
  }
  next();
}

// generateToken is not used with Supabase JWTs. Remove or update if needed for other flows.

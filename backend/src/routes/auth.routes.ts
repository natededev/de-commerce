import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service.js';
import { verifySupabaseJWT } from '../middleware/supabase-jwt.js';
import { LoginCredentials } from '../types/index.js';

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email')
    .exists().withMessage('Email is required')
    .isString().withMessage('Email must be a string')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .exists().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

const validateProfileUpdate = [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
];

const validatePasswordChange = [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
];

// Helper function to handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log('Validating request body:', JSON.stringify(req.body, null, 2));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array();
    console.log('Validation errors:', JSON.stringify(validationErrors, null, 2));
    
    // Create a more user-friendly error message
    const errorMessages = validationErrors.map(err => ({
      field: typeof err === 'object' && 'type' in err ? err.type : 'unknown',
      message: err.msg,
      value: req.body[err.type as string]
    }));

    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errorMessages,
    });
    return;
  }
  console.log('Validation passed');
  next();
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  validateRegistration,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      console.log('Starting registration process for:', email);

      // Create user using auth service
      const user = await AuthService.register({
        name,
        email,
        password, // Pass the plain password to the service
      });

      console.log('User registered successfully:', email);

      // Send success response with user data only
      return res.status(201).json({
        success: true,
        data: {
          user: user.user,
        },
      });
    } catch (error) {
      // Check if it's a duplicate email error
      if (error instanceof Error) {
        console.error('Registration error details:', error.message);
        
        if ('code' in error && error.code === 'P2002') {
          return res.status(400).json({
            success: false,
            error: 'Email already registered',
          });
        }

        // Check for specific error messages
        if (error.message.includes('already exists')) {
          return res.status(400).json({
            success: false,
            error: 'Email already registered',
          });
        }
      }
      
      // Handle other errors
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error during registration',
      });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const credentials: LoginCredentials = req.body;
      const result = await AuthService.login(credentials);

      res.json({
        success: true,
        data: {
          user: result.user,
        },
        message: 'Login successful',
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  }
);

// @route   GET /api/auth/validate
// @desc    Validate authentication token
// @access  Private
router.get(
  '/validate',
  verifySupabaseJWT,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
        return;
      }
      const user = await AuthService.getCurrentUser(req.user.id);

      res.json({
        success: true,
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error instanceof Error ? error.message : 'User not found',
      });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', verifySupabaseJWT, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }
    const user = await AuthService.getCurrentUser(req.user.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error instanceof Error ? error.message : 'User not found',
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  verifySupabaseJWT,
  validateProfileUpdate,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
        return;
      }
      const updates = req.body as Partial<{ email: string; name: string }>;
      const user = await AuthService.updateProfile(req.user.id, updates);

      res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      });
    }
  }
);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put(
  '/change-password',
  verifySupabaseJWT,
  validatePasswordChange,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
        return;
      }
      const { currentPassword, newPassword } = req.body as {
        currentPassword: string;
        newPassword: string;
      };
      await AuthService.changePassword(
        req.user.id,
        currentPassword,
        newPassword
      );

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Password change failed',
      });
    }
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate token)
// @access  Private
router.post(
  '/logout',
  verifySupabaseJWT,
  async (_req: Request, res: Response) => {
    try {
      // In a real application, you might want to add the token to a blacklist
      // For now, we'll just return success since the client will clear the token
      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch {
      res.status(500).json({
        success: false,
        error: 'Logout failed',
      });
    }
  }
);

export default router;

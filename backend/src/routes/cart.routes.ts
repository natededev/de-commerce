import { Router, Request, Response, NextFunction } from 'express';
import { CartService } from '../services/cart.service.js';
import { verifySupabaseJWT } from '../middleware/supabase-jwt.js';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// Validation middleware
const validateAddToCart = [
  body('productId').notEmpty(),
  body('quantity').isInt({ min: 1 }),
];

const validateUpdateQuantity = [
  param('productId').notEmpty(),
  body('quantity').isInt({ min: 0 }),
];

// Helper function to handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array(),
    });
    return;
  }
  next();
};

// Validation middleware for cart sync
const validateCartSync = [
  body().isObject(),
  body('items').isArray(),
  body('items.*.product.id').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('total').isNumeric(),
  body('itemCount').isInt({ min: 0 }),
];

// @route   POST /api/cart/sync
// @desc    Sync cart items from frontend to backend
// @access  Private
router.post('/sync', verifySupabaseJWT, validateCartSync, handleValidationErrors, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }

    const syncedCart = await CartService.syncCart(req.user.id, req.body);
    res.json({
      success: true,
      data: syncedCart,
    });
  } catch (err) {
    console.error('Cart sync error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to sync cart',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', verifySupabaseJWT, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }
    
    const cart = await CartService.getOrCreateActiveCart(req.user.id);

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch cart',
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post(
  '/',
  verifySupabaseJWT,
  validateAddToCart,
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
      const { productId, quantity } = req.body as {
        productId: string;
        quantity: number;
      };
      const cart = await CartService.addToCart(
        req.user.id,
        productId,
        quantity
      );

      res.status(201).json({
        success: true,
        data: cart,
        message: 'Item added to cart successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to add item to cart',
      });
    }
  }
);

// @route   PUT /api/cart/:cartId/:productId
// @desc    Update cart item quantity
// @access  Private
router.put(
  '/:cartId/:productId',
  verifySupabaseJWT,
  validateUpdateQuantity,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body as { quantity: number };

      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'User not authenticated',
        });
        return;
      }

      const cart = await CartService.updateCartItemQuantity(
        req.user.id,
        cartId,
        productId,
        quantity
      );

      res.json({
        success: true,
        data: cart,
        message: quantity > 0 ? 'Cart item updated successfully' : 'Item removed from cart',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to update cart item',
      });
    }
  }
);

// @route   DELETE /api/cart/:cartId/:productId
// @desc    Remove item from cart
// @access  Private
router.delete(
  '/:cartId/:productId',
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
      const { cartId, productId } = req.params;
      const cart = await CartService.removeFromCart(req.user.id, cartId, productId);

      res.json({
        success: true,
        data: cart,
        message: 'Item removed from cart successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to remove item from cart',
      });
    }
  }
);

// @route   DELETE /api/cart/:cartId
// @desc    Clear entire cart
// @access  Private
router.delete('/:cartId', verifySupabaseJWT, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'User not authenticated',
      });
      return;
    }
    const { cartId } = req.params;
    const cart = await CartService.clearCart(req.user.id, cartId);

    res.json({
      success: true,
      data: cart,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to clear cart',
    });
  }
});



export default router;

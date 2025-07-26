import { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service.js';
import { verifySupabaseJWT } from '../middleware/supabase-jwt.js';
import { requireAdmin } from '../middleware/auth.js';
import { body, query, validationResult } from 'express-validator';

const router = Router();

// Validation middleware
const validateProduct = [
  body('name').trim().isLength({ min: 2 }),
  body('description').trim().isLength({ min: 10 }),
  body('price').isFloat({ min: 0 }),
  body('image').isURL(),
  body('category').trim().notEmpty(),
  body('stockCount').isInt({ min: 0 }),
];

const validateProductUpdate = [
  body('name').optional().trim().isLength({ min: 2 }),
  body('description').optional().trim().isLength({ min: 10 }),
  body('price').optional().isFloat({ min: 0 }),
  body('image').optional().isURL(),
  body('category').optional().trim().notEmpty(),
  body('stockCount').optional().isInt({ min: 0 }),
];

const validateQueryParams = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
];

// Helper function to handle validation errors
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array(),
    });
  }
  return next(); // Ensure all code paths return
};

// @route   GET /api/products
// @desc    Get all products with pagination and filters
// @access  Public
router.get(
  '/',
  validateQueryParams,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    res.set('Cache-Control', 'public, max-age=60');
    const start = Date.now();
    try {
      const {
        page = 1,
        limit = 10,
        category,
        search,
        minPrice,
        maxPrice,
      } = req.query;

      const result = await ProductService.getAllProducts(
        Number(page),
        Number(limit),
        category as string,
        search as string,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined
      );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
      });
    } finally {
      console.log(`[PERF] GET /api/products took ${Date.now() - start}ms`);
    }
  }
);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', async (_req: Request, res: Response) => {
  res.set('Cache-Control', 'public, max-age=300');
  const start = Date.now();
  try {
    const categories = await ProductService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch categories',
    });
  } finally {
    console.log(
      `[PERF] GET /api/products/categories took ${Date.now() - start}ms`
    );
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const product = await ProductService.getProductById(req.params.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error instanceof Error ? error.message : 'Product not found',
    });
  } finally {
    console.log(`[PERF] GET /api/products/:id took ${Date.now() - start}ms`);
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin only)
router.post(
  '/',
  verifySupabaseJWT,
  requireAdmin,
  validateProduct,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const start = Date.now();
    try {
      const product = await ProductService.createProduct(req.body);

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to create product',
      });
    } finally {
      console.log(`[PERF] POST /api/products took ${Date.now() - start}ms`);
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Admin only)
router.put(
  '/:id',
  verifySupabaseJWT,
  requireAdmin,
  validateProductUpdate,
  handleValidationErrors,
  async (req: Request, res: Response) => {
    const start = Date.now();
    try {
      const product = await ProductService.updateProduct(
        req.params.id,
        req.body
      );

      res.json({
        success: true,
        data: product,
        message: 'Product updated successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to update product',
      });
    } finally {
      console.log(`[PERF] PUT /api/products/:id took ${Date.now() - start}ms`);
    }
  }
);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
router.delete(
  '/:id',
  verifySupabaseJWT,
  requireAdmin,
  async (req: Request, res: Response) => {
    const start = Date.now();
    try {
      await ProductService.deleteProduct(req.params.id);

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete product',
      });
    } finally {
      console.log(
        `[PERF] DELETE /api/products/:id took ${Date.now() - start}ms`
      );
    }
  }
);

export default router;

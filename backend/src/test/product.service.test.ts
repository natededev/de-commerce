import { describe, it, expect } from 'vitest';
import { ProductService } from '../services/product.service';

describe('ProductService', () => {
  it('should have getAllProducts method', () => {
    expect(ProductService.getAllProducts).toBeDefined();
    expect(typeof ProductService.getAllProducts).toBe('function');
  });

  it('should have getProductById method', () => {
    expect(ProductService.getProductById).toBeDefined();
    expect(typeof ProductService.getProductById).toBe('function');
  });

  it('should have createProduct method', () => {
    expect(ProductService.createProduct).toBeDefined();
    expect(typeof ProductService.createProduct).toBe('function');
  });
});

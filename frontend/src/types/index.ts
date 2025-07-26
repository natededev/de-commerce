// Centralized type definitions for products, cart, user, order, auth, and API responses

// User interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'USER' | 'ADMIN';

// Product interfaces
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  rating?: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Cart interfaces
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  status: CartStatus;
  items: CartItem[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export type CartStatus = 'active' | 'converted_to_order' | 'abandoned';

// Order interfaces
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtTime: number;
  product: Product;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  stripePaymentIntentId?: string;
  shippingAddress?: unknown;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// Navigation interface
export interface NavigationItem {
  name: string;
  href: string;
  disabled?: boolean;
}

// State interfaces
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// API interfaces
export interface ValidationError {
  msg: string;
  param: string;
  value: string;
  location: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: ValidationError[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Stripe interfaces
export interface CreateCheckoutSessionRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

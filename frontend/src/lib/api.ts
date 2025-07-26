import { supabase } from '@/lib/supabaseClient';
/**
 * API Client - Centralized HTTP Client Configuration
 *
 * Provides a centralized HTTP client for making API requests to the backend.
 * This module handles:
 * - Base URL configuration and environment-based settings
 * - Authentication token management
 * - Request/response interceptors and error handling
 * - HTTP method abstractions (GET, POST, PUT, DELETE, PATCH)
 * - Request timeout and retry logic
 *
 * The client automatically includes authentication headers when available
 * and provides consistent error handling across all API calls.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
    'https://localhost:3000/api';

/**
 * API Configuration Interface
 *
 * Defines the structure for API client configuration including
 * base URL, timeout settings, and default headers.
 */
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

// Import the backend response types
import { ApiResponse, ValidationError } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Error Logging Utility
 *
 * Centralized error logging that respects environment settings.
 * In development, logs to console. In production, could be sent to
 * error tracking services like Sentry or LogRocket.
 */
const logError = (message: string, error: unknown) => {
  if (siteConfig.development.enableDebugLogs) {
    console.warn(`${message}:`, error);
  }
  // In production, this could be sent to an error tracking service
};

/**
 * API Client Class
 *
 * Main HTTP client that handles all API communication with the backend.
 * Provides methods for different HTTP verbs and handles authentication,
 * error handling, and request configuration.
 */
class ApiClient {
  private config: ApiConfig;

  constructor() {
    this.config = {
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  /**
   * Get Supabase JWT (access token)
   *
   * Retrieves the current Supabase session's access token.
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token || null;
    } catch {
      return null;
    }
  }

  /**
   * Core Request Method
   *
   * Handles all HTTP requests with consistent configuration:
   * - URL construction with base URL
   * - Authentication header injection
   * - Request timeout handling
   * - Response parsing and error handling
   *
   * @param endpoint - API endpoint path (e.g., '/auth/login')
   * @param options - Fetch API options (method, body, headers, etc.)
   * @returns Promise with typed API response
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    const token = await this.getAuthToken();

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.config.timeout),
    };

    try {
      const response = await fetch(url, config);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to parse error response as JSON, fallback to text
        let errorMessage: string;
        try {
          const errorData = await response.json();
          if (errorData.details && Array.isArray(errorData.details)) {
            // Handle validation errors
            const validationErrors = errorData.details.map((err: ValidationError) => err.msg).join(', ');
            errorMessage = `Validation failed: ${validationErrors}`;
          } else {
            errorMessage =
              errorData.message ||
              errorData.error ||
              `HTTP error! status: ${response.status}`;
          }
        } catch {
          // If JSON parsing fails, get the text content
          const errorText = await response.text();
          errorMessage = errorText || `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      // Try to parse successful response as JSON
      let data: ApiResponse<T>;
      try {
        data = await response.json();
      } catch {
        throw new Error('Invalid JSON response from server');
      }

      if (!data.success) {
        throw new Error(data.error || 'Request failed');
      }

      return data.data as T;
    } catch (error) {
      logError('API request failed', error);
      throw error;
    }
  }

  /**
   * GET Request Method
   *
   * Performs HTTP GET requests for retrieving data.
   * @param endpoint - API endpoint path
   * @returns Promise with typed response data
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * POST Request Method
   *
   * Performs HTTP POST requests for creating new resources.
   * @param endpoint - API endpoint path
   * @param data - Request body data (optional)
   * @returns Promise with typed response data
   */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT Request Method
   *
   * Performs HTTP PUT requests for updating existing resources.
   * @param endpoint - API endpoint path
   * @param data - Request body data (optional)
   * @returns Promise with typed response data
   */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE Request Method
   *
   * Performs HTTP DELETE requests for removing resources.
   * @param endpoint - API endpoint path
   * @returns Promise with typed response data
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * PATCH Request Method
   *
   * Performs HTTP PATCH requests for partial resource updates.
   * @param endpoint - API endpoint path
   * @param data - Request body data (optional)
   * @returns Promise with typed response data
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Export singleton instance for consistent usage across the app
export const apiClient = new ApiClient();

// Export types for use in other files
export type { ApiResponse, ApiConfig };

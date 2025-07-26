/**
 * API Response Handlers
 * 
 * Standardized response handling and error management for all API calls.
 * Provides consistent error handling and success response parsing.
 */

import { ApiResponse } from '@/types';

/**
 * Standard API error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Handle API response with standardized error handling
 */
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new ApiError(
      response.error || 'Unknown API error',
      undefined,
      response
    );
  }
  
  if (response.data === undefined) {
    throw new ApiError('API response missing data field');
  }
  
  return response.data;
}

/**
 * Safe API call wrapper with error handling
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallbackValue?: T
): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    console.warn('API call failed:', error);
    return fallbackValue ?? null;
  }
}

/**
 * Retry API call with exponential backoff
 */
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

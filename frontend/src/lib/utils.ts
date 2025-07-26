/**
 * Utility Functions - Common Helper Functions
 *
 * Provides utility functions used throughout the application:
 * - Class name merging for Tailwind CSS optimization
 * - Type-safe class name handling
 * - Conflict resolution for CSS classes
 *
 * These utilities help maintain clean, optimized CSS and
 * prevent class conflicts in the component library.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Class Name Utility (cn)
 *
 * Merges multiple class names and resolves Tailwind CSS conflicts.
 * This function combines clsx for conditional class names and
 * tailwind-merge for intelligent class deduplication.
 *
 * @param inputs - Array of class names, objects, or arrays
 * @returns Merged and optimized class name string
 *
 * @example
 * cn('text-red-500', 'text-blue-500') // Returns 'text-blue-500'
 * cn('p-4', { 'bg-red-500': isActive }) // Conditional classes
 * cn('base-class', className) // Merge with prop className
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

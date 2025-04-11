import { ClassValue, clsx } from 'clsx';
import { cva as originalCva, type VariantProps } from 'class-variance-authority';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const cva = originalCva;

export type { VariantProps }; 
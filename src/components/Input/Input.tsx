import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import { cn } from '../../utils/cva';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  type = 'text',
  className,
}, ref) => {
  const inputClasses = cn(
    styles.input,
    error && styles.inputError,
    className
  );

  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={inputClasses}
    />
  );
});

Input.displayName = 'Input'; 
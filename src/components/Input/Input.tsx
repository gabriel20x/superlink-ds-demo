import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import { cn } from '../../utils/cva';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  error = false,
  className,
  ...props
}, ref) => {
  const inputClasses = cn(
    styles.input,
    error && styles.inputError,
    className
  );

  return (
    <input
      ref={ref}
      className={inputClasses}
      {...props}
    />
  );
});

Input.displayName = 'Input'; 
import React, { forwardRef } from 'react';
import styles from './Select.module.css';
import { cn } from '../../utils/cva';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  error = false,
  placeholder,
  className,
  ...props
}, ref) => {
  const selectClasses = cn(
    styles.select,
    error && styles.selectError,
    className
  );

  return (
    <select
      ref={ref}
      className={selectClasses}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select'; 
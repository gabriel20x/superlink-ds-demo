import React from 'react';
import { cva, cn } from '../../utils/cva';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive';
type ButtonSize = 'S' | 'M' | 'L';
type ButtonWidth = 'full' | 'fit' | 'auto';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  label: string;
}

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
      text: styles.text,
      destructive: styles.destructive,
    },
    size: {
      S: styles.S,
      M: styles.M,
      L: styles.L,
    },
    width: {
      full: styles.full,
      fit: styles.fit,
      auto: styles.auto,
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'M',
    width: 'full'
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, label, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width }), className)}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  }
);

Button.displayName = 'Button';

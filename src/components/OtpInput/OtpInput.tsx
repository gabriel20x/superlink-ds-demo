import React, { forwardRef, useRef, useEffect } from 'react';
import styles from './OtpInput.module.css';
import { cn } from '../../utils/cva';
import { WarningIcon } from '../Icon/icons';

type OtpVariants = 'small' | 'large';

export interface OtpInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  inputFeedback?: string;
  variant?: OtpVariants;
}

export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(({
  length = 4,
  value = '',
  onChange,
  error = false,
  className,
  inputFeedback = "Invalid Code. Try Again.",
  variant = 'small',
  ...props
}, ref) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, newValue: string) => {
    if (newValue.length > 1) {
      // Handle paste event
      const pastedValue = newValue.slice(0, length);
      onChange(pastedValue);
      return;
    }

    const newOtp = value.split('');
    newOtp[index] = newValue;
    const finalOtp = newOtp.join('');

    onChange(finalOtp);

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.otpContainer}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
              if (ref && typeof ref === 'function') {
                ref(el);
              }
            }}
            type="text"
            maxLength={1}
            value={value?.[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              styles.otpInput,
              error && styles.otpInputError,
              variant === 'small' && styles.otpInputSmall,
              variant === 'large' && styles.otpInputLarge,
              className
            )}
            {...props}
          />
        ))}
      </div>
      
      {error &&inputFeedback && (
          <div className={cn(styles.inputFeedback, error && styles.errorText)}>
            <WarningIcon width={16} height={16} />
            {inputFeedback}
          </div>
        )}
    </div>
  );
});

OtpInput.displayName = 'OtpInput'; 
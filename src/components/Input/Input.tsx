import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import { cn } from "../../utils/cva";
import { HelpOutlinedIcon, WarningIcon } from "../Icon/icons";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: "L" | "M" | "S";
  helperText?: string;
  trailingIcon?: React.ReactNode;
  tooltip?: string;
  inputFeedback?: string;
  inputLabel?: string;
  onTrailingIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      size = "L",
      helperText,
      trailingIcon,
      tooltip,
      inputFeedback,
      inputLabel,
      className,
      onTrailingIconClick,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = cn(
      styles.wrapper,
      styles[`size${size}`],
      error && styles.wrapperError
    );

    const inputClasses = cn(
      styles.input,
      error && styles.inputError,
      trailingIcon && styles.hasTrailingIcon,
      className
    );

    return (
      <div className={wrapperClasses}>
        {inputLabel && (
          <div className={styles.labelWrapper}>
            <label className={styles.label}>
              {inputLabel}
              {tooltip && <HelpOutlinedIcon width={16} height={16} />}
            </label>
            {helperText && (
              <div className={styles.helperText}>{helperText}</div>
            )}
          </div>
        )}
        <div className={styles.inputWrapper}>
          <input ref={ref} className={inputClasses} {...props} />
          {trailingIcon && (
            <div className={styles.trailingIcon} onClick={onTrailingIconClick}>
              {trailingIcon}
            </div>
          )}
        </div>
        {inputFeedback && (
          <div className={cn(styles.inputFeedback, error && styles.errorText)}>
            <WarningIcon width={16} height={16} />
            {inputFeedback}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

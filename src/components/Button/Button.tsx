import React from "react";
import { cva, cn } from "../../utils/cva";
import styles from "./Button.module.css";
import { LoadingIcon } from "../Icon/icons";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "text"
  | "destructive";
type ButtonSize = "S" | "M" | "L";
type ButtonWidth = "full" | "fit" | "auto";
type ButtonIconPosition = "left" | "right";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
  loading?: boolean;
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
    },
    loading: {
      true: styles.loading,
      false: styles.notLoading,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "M",
    width: "full",
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      label,
      icon,
      iconPosition,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width, loading }), className)}
        style={{ display: 'flex', gap: '8px' }}
        ref={ref}
        {...props}
        disabled={props.disabled || loading}
      >
        {loading ? (
          <LoadingIcon width={24} height={24} />
        ) : (
          <>{icon && iconPosition === "left" && icon}</>
        )}
        {label}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";

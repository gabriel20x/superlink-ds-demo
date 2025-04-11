import styles from './button.module.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const sizeClass = (() => {
    switch(size) {
      case 'small':
        return styles.storybookButtonSmall;
      case 'medium':
        return styles.storybookButtonMedium;
      case 'large':
        return styles.storybookButtonLarge;
      default:
        return styles.storybookButtonMedium;
    }
  })();
  const primaryClass = (() => {
    if (primary) {
      return styles.storybookButtonPrimary;
    }
    return styles.storybookButtonSecondary;
  })();
  return (
    <button
      type="button"
      className={[styles.storybookButton, sizeClass, primaryClass].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

import React, { forwardRef, useState, useRef, useEffect } from "react";
import styles from "./PhoneInput.module.css";
import { cn } from "../../utils/cva";
import {
  ExpandMoreIcon,
  HelpOutlinedIcon,
  SearchIcon,
  WarningIcon,
} from "../Icon/icons";
import { Country, countryCodes } from "../../utils/countries";
import { formatPhoneNumber, isValidPhoneNumber, normalizePhoneNumber } from "../../utils/phonePatterns";

/**
 * Props for the PhoneInput component
 * @extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">
 */
export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Indicates if the input is in an error state */
  error?: boolean;
  /** Size of the input field */
  size?: "L" | "M" | "S";
  /** Helper text displayed below the input */
  helperText?: string;
  /** Tooltip text displayed when hovering over the help icon */
  tooltip?: string;
  /** Feedback message displayed below the input */
  inputFeedback?: string;
  /** Label text for the input */
  inputLabel?: string;
  /** Callback fired when the country selection changes */
  onCountryChange?: (country: Country) => void;
  /** Custom trailing icon component */
  trailingIcon?: React.ReactNode;
  /** Callback fired when the trailing icon is clicked */
  onTrailingIconClick?: () => void;
  /** Callback fired when the input value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Custom validation function for the phone number */
  isValid?: (value: string, country: Country) => boolean | string;
}

/**
 * A phone input component with country selection and validation.
 * 
 * @remarks
 * This component is designed to be used with the `usePhoneInput` hook for proper state management and validation.
 * Using this component without the hook may result in unexpected behavior.
 * 
 * @example
 * ```tsx
 * const PhoneInputWithHook = () => {
 *   const {
 *     phoneNumber,
 *     isValid,
 *     handlePhoneChange,
 *     handleValidation,
 *     handleCountryChange,
 *   } = usePhoneInput();
 * 
 *   return (
 *     <PhoneInput
 *       value={phoneNumber}
 *       onChange={handlePhoneChange}
 *       onCountryChange={handleCountryChange}
 *       isValid={handleValidation}
 *       inputLabel="Phone Number"
 *     />
 *   );
 * };
 * ```
 * 
 * @example
 * ```tsx
 * // Warning: Using without the hook (not recommended)
 * const PhoneInputWithoutHook = () => {
 *   const [value, setValue] = useState('');
 * 
 *   return (
 *     <PhoneInput
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       inputLabel="Phone Number"
 *     />
 *   );
 * };
 * ```
 */
export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      error = false,
      size = "L",
      helperText,
      tooltip,
      inputFeedback,
      inputLabel,
      className,
      onChange,
      onCountryChange,
      trailingIcon,
      onTrailingIconClick,
      isValid,
      ...props
    },
    ref
  ) => {
    // Warn if not using the hook
    useEffect(() => {
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && !isValid) {
        console.warn(
          'PhoneInput: It is recommended to use this component with the usePhoneInput hook ' +
          'for proper validation and formatting. Using without the hook may result in unexpected behavior.'
        );
      }
    }, [isValid]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(
      countryCodes[0]
    );
    const [dropdownHeight, setDropdownHeight] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const filteredCountries = countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    /**
     * Validates the phone number using either the custom validation function or the default validation
     * @param value - The phone number to validate
     * @param country - The selected country
     * @returns boolean or string indicating validation result
     */
    const validatePhoneNumber = (value: string, country: Country): boolean | string => {
      if (isValid) {
        return isValid(value, country);
      }

      // Use libphonenumber-js for validation
      if (!isValidPhoneNumber(value, country)) {
        return "Please enter a valid phone number";
      }

      return true;
    };

    /**
     * Handles input changes, formatting, and validation
     * @param e - React change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      // Remove all non-digit characters and check length
      const digitsOnly = newValue.replace(/\D/g, '');
      if (digitsOnly.length > 15) {
        return; // Don't update if exceeding 15 digits
      }
      
      const formatted = formatPhoneNumber(digitsOnly, selectedCountry);
      setFormattedValue(formatted);
      
      // Validate the phone number
      const validationResult = validatePhoneNumber(digitsOnly, selectedCountry);
      if (validationResult !== true) {
        setValidationError(validationResult as string);
      } else {
        setValidationError(null);
      }
      
      if (onChange) {
        // Create a new event with the normalized value
        const normalizedValue = normalizePhoneNumber(digitsOnly, selectedCountry);
        const event = {
          ...e,
          target: {
            ...e.target,
            value: normalizedValue || formatted,
          },
        };
        onChange(event as React.ChangeEvent<HTMLInputElement>);
      }
    };

    /**
     * Handles country selection and revalidates the current phone number
     * @param country - The newly selected country
     */
    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      setIsOpen(false);
      onCountryChange?.(country);
      
      // Revalidate when country changes
      const validationResult = validatePhoneNumber(formattedValue, country);
      if (validationResult !== true) {
        setValidationError(validationResult as string);
      } else {
        setValidationError(null);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          buttonRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const wrapperClasses = cn(
      styles.wrapper,
      styles[`size${size}`],
    );

    const inputClasses = cn(
      styles.input,
      trailingIcon && styles.hasTrailingIcon,
      className
    );

    const countryButtonClasses = cn(
      styles.countryButton,
      error && styles.countryButtonError
    );

    useEffect(() => {
      const handleResize = () => {
        if (dropdownRef.current) {
          const top = dropdownRef.current.getBoundingClientRect().top || 0;
          setDropdownHeight(Math.min(window.innerHeight - top - 16, 288));
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

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
        <div className={styles.phoneInputContainer}>
          <div className={styles.inputWrapper}>
            <button
              ref={buttonRef}
              type="button"
              className={countryButtonClasses}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={styles.countryCode}>{selectedCountry.dialCode}</span>

              <input
                ref={ref}
                className={inputClasses}
                value={formattedValue}
                onChange={handleInputChange}
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                onClick={(e) => e.stopPropagation()}
                {...props}
              />
              <div
                className={cn(
                  styles.trailingIcon,
                  isOpen && styles.trailingIconIsOpen
                )}
                onClick={onTrailingIconClick}
              >
                <ExpandMoreIcon width={16} height={16} />
              </div>
            </button>

            <div
              ref={dropdownRef}
              className={styles.dropdown}
              style={{
                visibility: isOpen ? "visible" : "hidden",
                maxHeight: dropdownHeight,
              }}
            >
              <div className={styles.searchInputWrapper}>
                <SearchIcon
                  width={16}
                  height={16}
                  className={styles.searchIcon}
                />
                <input
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.countryList}>
                {filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className={styles.countryOption}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className={styles.dialCode}>{country.dialCode}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {(inputFeedback || validationError) && (
          <div className={cn(styles.inputFeedback, (error || validationError) && styles.errorText)}>
            <WarningIcon width={16} height={16} />
            {validationError || inputFeedback}
          </div>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

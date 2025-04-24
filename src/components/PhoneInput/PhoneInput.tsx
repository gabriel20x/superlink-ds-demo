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

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: "L" | "M" | "S";
  helperText?: string;
  tooltip?: string;
  inputFeedback?: string;
  inputLabel?: string;
  onCountryChange?: (country: Country) => void;
  trailingIcon?: React.ReactNode;
  onTrailingIconClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: (value: string, country: Country) => boolean | string;
}

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const formatted = formatPhoneNumber(newValue, selectedCountry);
      setFormattedValue(formatted);
      
      // Validate the phone number
      const validationResult = validatePhoneNumber(newValue, selectedCountry);
      if (validationResult !== true) {
        setValidationError(validationResult as string);
      } else {
        setValidationError(null);
      }
      
      if (onChange) {
        // Create a new event with the normalized value
        const normalizedValue = normalizePhoneNumber(newValue, selectedCountry);
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
      error && styles.wrapperError
    );

    const inputClasses = cn(
      styles.input,
      error && styles.inputError,
      trailingIcon && styles.hasTrailingIcon,
      className
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
              className={styles.countryButton}
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

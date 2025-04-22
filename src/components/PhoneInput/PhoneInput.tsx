import React, { forwardRef, useState, useRef, useEffect } from "react";
import styles from "./PhoneInput.module.css";
import { cn } from "../../utils/cva";
import { ExpandMoreIcon, HelpOutlinedIcon, WarningIcon } from "../Icon/icons";
import { CountryCode, countryCodes } from "../../utils/countries";

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: "L" | "M" | "S";
  helperText?: string;
  tooltip?: string;
  inputFeedback?: string;
  inputLabel?: string;
  onCountryChange?: (country: CountryCode) => void;
  trailingIcon?: React.ReactNode;
  onTrailingIconClick?: () => void;
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
      value,
      onChange,
      onCountryChange,
      trailingIcon,
      onTrailingIconClick,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
      countryCodes[0]
    );
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const filteredCountries = countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    const handleCountrySelect = (country: CountryCode) => {
      setSelectedCountry(country);
      setIsOpen(false);
      onCountryChange?.(country);
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
              <span>{selectedCountry.dialCode}</span>

              <input
                ref={ref}
                className={inputClasses}
                value={value}
                onChange={onChange}
                type="tel"
                {...props}
              />
              <div
                className={cn(styles.trailingIcon, isOpen && styles.trailingIconIsOpen)}
                onClick={onTrailingIconClick}
              >
                <ExpandMoreIcon width={16} height={16} />
              </div>
            </button>

            {isOpen && (
              <div ref={dropdownRef} className={styles.dropdown}>
                <div className={styles.searchInputWrapper}>
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
                      <span>{country.name}</span>
                      <span className={styles.dialCode}>
                        {country.dialCode}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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

PhoneInput.displayName = "PhoneInput";

import { useState, useCallback, useEffect } from 'react';
import { Country } from '../utils/countries';
import { formatPhoneNumber, isValidPhoneNumber } from '../utils/phonePatterns';

interface UsePhoneInputProps {
  /** 
   * Time in milliseconds to wait before updating the debounced value
   * @default 300
   */
  debounceTime?: number;
}

/**
 * A custom hook for handling phone input functionality including validation, formatting, and debouncing.
 * 
 * @example
 * ```tsx
 * const PhoneInputComponent = () => {
 *   const {
 *     phoneNumber,
 *     debouncedPhoneNumber,
 *     formattedPhoneNumber,
 *     isValid,
 *     handlePhoneChange,
 *     handleValidation,
 *     handleCountryChange,
 *   } = usePhoneInput();
 * 
 *   // Handle side effects with debounced value
 *   useEffect(() => {
 *     if (isValid) {
 *       console.log('Valid phone number:', debouncedPhoneNumber);
 *       // Make API call or update form state
 *     }
 *   }, [debouncedPhoneNumber, isValid]);
 * 
 *   return (
 *     <PhoneInput
 *       value={phoneNumber}
 *       onChange={handlePhoneChange}
 *       onCountryChange={handleCountryChange}
 *       isValid={handleValidation}
 *     />
 *   );
 * };
 * ```
 * 
 * @example
 * ```tsx
 * // Using with a form
 * const PhoneForm = () => {
 *   const {
 *     phoneNumber,
 *     isValid,
 *     handlePhoneChange,
 *     handleValidation,
 *     handleCountryChange,
 *   } = usePhoneInput({ debounceTime: 500 });
 * 
 *   const handleSubmit = (e: React.FormEvent) => {
 *     e.preventDefault();
 *     if (isValid) {
 *       // Submit form with phoneNumber
 *     }
 *   };
 * 
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <PhoneInput
 *         value={phoneNumber}
 *         onChange={handlePhoneChange}
 *         onCountryChange={handleCountryChange}
 *         isValid={handleValidation}
 *       />
 *       <button type="submit" disabled={!isValid}>
 *         Submit
 *       </button>
 *     </form>
 *   );
 * };
 */
export const usePhoneInput = ({ 
  debounceTime = 300 
}: UsePhoneInputProps = {}) => {
  /** Current raw phone number value */
  const [phoneNumber, setPhoneNumber] = useState('');
  /** Validation state of the phone number */
  const [isValid, setIsValid] = useState(false);
  /** Debounced version of the phone number */
  const [debouncedPhoneNumber, setDebouncedPhoneNumber] = useState('');
  /** Formatted version of the phone number according to the country's format */
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  /**
   * Handles phone number input changes
   * @param e - React change event from the input
   */
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
  }, []);

  /**
   * Validates the phone number against the country's format and length requirements
   * @param value - The phone number to validate
   * @param country - The selected country
   * @returns boolean indicating if the phone number is valid
   */
  const handleValidation = useCallback((value: string, country: Country) => {
    // Remove all non-digit characters for validation
    const digitsOnly = value.replace(/\D/g, '');
    const minLength = country.dialCode.replace(/\D/g, '').length + 7; // Country code digits + minimum 7 digits
    
    // Check if the number has enough digits
    const hasEnoughDigits = digitsOnly.length >= minLength;
    
    // Check if the number is valid according to the country's format
    const isFormatValid = isValidPhoneNumber(digitsOnly, country);
    
    // Format the phone number
    const formatted = formatPhoneNumber(digitsOnly, country);
    setFormattedPhoneNumber(formatted);
    
    const isValid = hasEnoughDigits && isFormatValid;
    setIsValid(isValid);
    return isValid;
  }, []);

  /**
   * Handles country selection changes and revalidates the current phone number
   * @param country - The newly selected country
   */
  const handleCountryChange = useCallback((country: Country) => {
    // Revalidate when country changes
    handleValidation(phoneNumber, country);
  }, [phoneNumber, handleValidation]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPhoneNumber(phoneNumber);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [phoneNumber, debounceTime]);

  return {
    /** Current raw phone number value */
    phoneNumber,
    /** Debounced version of the phone number */
    debouncedPhoneNumber,
    /** Formatted version of the phone number according to the country's format */
    formattedPhoneNumber,
    /** Validation state of the phone number */
    isValid,
    /** Handler for phone number input changes */
    handlePhoneChange,
    /** Handler for phone number validation */
    handleValidation,
    /** Handler for country selection changes */
    handleCountryChange,
  };
}; 
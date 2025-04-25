import { useState, useCallback, useEffect } from 'react';
import { Country } from '../utils/countries';
import { formatPhoneNumber, isValidPhoneNumber } from '../utils/phonePatterns';

interface UsePhoneInputProps {
  onPhoneChange?: (value: string) => void;
  onCountryChange?: (country: Country) => void;
  debounceTime?: number;
}

export const usePhoneInput = ({ 
  onPhoneChange, 
  onCountryChange,
  debounceTime = 300 
}: UsePhoneInputProps = {}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [debouncedPhoneNumber, setDebouncedPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
  }, []);

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

  const handleCountryChange = useCallback((country: Country) => {
    onCountryChange?.(country);
  }, [onCountryChange]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPhoneNumber(phoneNumber);
      onPhoneChange?.(phoneNumber);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [phoneNumber, debounceTime, onPhoneChange]);

  return {
    phoneNumber,
    debouncedPhoneNumber,
    formattedPhoneNumber,
    isValid,
    handlePhoneChange,
    handleValidation,
    handleCountryChange,
  };
}; 
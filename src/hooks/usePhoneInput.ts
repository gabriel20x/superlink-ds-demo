import { useState } from 'react';
import { Country } from '../utils/countries';

interface UsePhoneInputProps {
  onPhoneChange?: (value: string) => void;
  onCountryChange?: (country: Country) => void;
}

export const usePhoneInput = ({ onPhoneChange, onCountryChange }: UsePhoneInputProps = {}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    onPhoneChange?.(newValue);
  };

  const handleValidation = (value: string, country: Country) => {
    const minLength = country.dialCode.length + 7; // Country code + minimum 7 digits
    const isValid = value.length >= minLength;
    setIsValid(isValid);
    return isValid;
  };

  const handleCountryChange = (country: Country) => {
    onCountryChange?.(country);
  };

  return {
    phoneNumber,
    isValid,
    handlePhoneChange,
    handleValidation,
    handleCountryChange,
  };
}; 
import { parsePhoneNumber, isValidPhoneNumber as libIsValidPhoneNumber } from 'libphonenumber-js';
import { Country, countryCodes } from './countries';

/**
 * Formats a phone number according to the national format of the specified country
 * @param {string} input - The phone number to format
 * @param {Country} country - The country to use for formatting
 * @returns {string} The formatted phone number, or the original input if formatting fails
 */
export const formatPhoneNumber = (input: string, country: Country): string => {
  try {
    const phoneNumber = parsePhoneNumber(input, country.code);
    if (phoneNumber) {
      return phoneNumber.formatNational();
    }
    return input;
  } catch {
    return input;
  }
};

/**
 * Removes all non-digit characters from a phone number
 * @param {string} input - The phone number to clean
 * @returns {string} The phone number with only digits
 */
export const cleanPhoneNumber = (input: string): string => {
  return input.replace(/\D/g, "");
};

/**
 * Validates a phone number for a specific country
 * @param {string} input - The phone number to validate
 * @param {Country} country - The country to use for validation
 * @returns {boolean} True if the phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (input: string, country: Country): boolean => {
  try {
    return libIsValidPhoneNumber(input, country.code);
  } catch {
    return false;
  }
};

/**
 * Extracts the country code from a phone number
 * @param {string} input - The phone number to analyze
 * @returns {Country | undefined} The country code if found, undefined otherwise
 */
export const getCountryCode = (input: string): Country | undefined => {
  try {
    const phoneNumber = parsePhoneNumber(input);
    if (!phoneNumber?.country) return undefined;
    
    // Find the matching country from our list
    return countryCodes.find((c: Country) => c.code === phoneNumber.country);
  } catch {
    return undefined;
  }
};

/**
 * Formats a phone number in international format
 * @param {string} input - The phone number to format
 * @param {Country} country - The country code to use for formatting
 * @returns {string} The internationally formatted phone number, or the original input if formatting fails
 */
export const getFormattedNumber = (input: string, country: Country): string => {
  try {
    const phoneNumber = parsePhoneNumber(input, country.code);
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return input;
  } catch {
    return input;
  }
};

/**
 * Formats a phone number in E.164 format (e.g., +12125551234)
 * @param {string} input - The phone number to format
 * @param {Country} country - The country code to use for formatting
 * @returns {string} The E.164 formatted phone number, or the original input if formatting fails
 */
export const getE164Format = (input: string, country: Country): string => {
  try {
    const phoneNumber = parsePhoneNumber(input, country.code);
    if (phoneNumber) {
      return phoneNumber.format('E.164');
    }
    return input;
  } catch {
    return input;
  }
};

/**
 * Normalizes and validates a phone number, returning it in E.164 format if valid
 * @param {string} input - The phone number to normalize and validate
 * @param {Country} country - The country to use for validation
 * @returns {string | null} The normalized phone number in E.164 format if valid, null otherwise
 */
export const normalizePhoneNumber = (
  input: string,
  country: Country
): string | null => {
  try {
    const phoneNumber = parsePhoneNumber(input, country.code);
    return phoneNumber?.isValid() ? phoneNumber.format('E.164') : null;
  } catch {
    return null;
  }
}; 
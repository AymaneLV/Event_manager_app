/**
 * Form validation utilities 
 */

// ✅ Add missing import for isValidPrice
import { isValidEmail, isValidPassword, isValidPrice } from '../currencyConverter';

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength (min 6 chars, 1 number, 1 letter)
export const isValidPassword = (password) => {
  if (password.length < 6) return false;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  return hasNumber && hasLetter;
};

// Check required fields
export const validateRequiredFields = (fields) => {
  const missingFields = fields.filter(field => !field.value);
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

// Compare two values (e.g., password confirmation)
export const compareValues = (value1, value2) => {
  return value1 === value2;
};

// Validate event form
export const validateEventForm = (formData) => {
  const errors = {};
  
  if (!formData.title?.trim()) {
    errors.title = 'Event title is required';
  }
  
  if (!formData.description?.trim()) {
    errors.description = 'Description is required';
  }
  
  if (!formData.date) {
    errors.date = 'Date is required';
  }
  
  if (!formData.time) {
    errors.time = 'Time is required';
  }
  
  if (!formData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!formData.category) {
    errors.category = 'Please select a category';
  }
  
  // ✅ Now works because isValidPrice is imported
  if (formData.price !== undefined && !isValidPrice(formData.price)) {
    errors.price = 'Valid price is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate registration form
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters with 1 number and 1 letter';
  }
  
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
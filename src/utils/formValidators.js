/**
 * Form validation utilities 
 */

// Keep only valid import
import { isValidPrice } from './currencyConverter';

// ✅ Move email validator here
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Move password validator here
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

// Validate contact form
export const validateContactForm = (formData) => {
  const errors = {};
  
  // Full Name
  if (!formData.name?.trim()) {
    errors.name = 'Full name is required';
  }
  
  // Phone
  if (!formData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[+]?[\d\s\-().]{7,}$/i.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Email
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }
  
  // Message
  if (!formData.message?.trim()) {
    errors.message = 'Message cannot be empty';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
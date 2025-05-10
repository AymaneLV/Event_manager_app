/**
 * Format and convert currency values
 */

// Format number as currency
export const formatCurrency = (amount, currency = 'USD') => {
  try {
    // Handle invalid values
    const value = parseFloat(amount);
    if (isNaN(value)) return 'N/A';
    
    // Format as free for $0
    if (value === 0) return 'Free';
    
    // Format with currency symbol
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return 'Error';
  }
};

// Convert cents to dollars
export const centsToDollars = (cents) => {
  try {
    const value = parseInt(cents);
    if (isNaN(value)) return 0;
    return (value / 100).toFixed(2);
  } catch (error) {
    console.error('Currency conversion error:', error);
    return 0;
  }
};

// Validate price input
export const isValidPrice = (price) => {
  try {
    const value = parseFloat(price);
    return !isNaN(value) && value >= 0;
  } catch (error) {
    return false;
  }
};
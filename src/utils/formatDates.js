/**
 * Format date strings into user-friendly formats
 */

// Format date as "July 25, 2024" or "Today"
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const today = new Date();
    const isToday = 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    
    if (isToday) return 'Today';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

// Format time as "12:00 PM - 10:00 PM"
export const formatTimeRange = (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatTime = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    };
    
    return `${formatTime(start)} - ${formatTime(end)}`;
  } catch (error) {
    console.error('Time formatting error:', error);
    return 'Invalid Time';
  }
};

// Format relative time like "2 hours ago"
export const formatRelativeTime = (dateString) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    return 'Just now';
  } catch (error) {
    console.error('Relative time formatting error:', error);
    return 'Invalid Date';
  }
};
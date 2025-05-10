const contactService = {
  submitContactForm: async (formData) => {
    // Replace with real API call later
    console.log('Submitting to backend:', formData);
    
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve({ success: true });
        } else {
          reject(new Error('Failed to send message'));
        }
      }, 800);
    });
  }
};

export default contactService;
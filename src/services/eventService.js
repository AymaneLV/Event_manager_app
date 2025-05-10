const mockEvents = [
  {
    _id: '1',
    title: "Summer Music Festival",
    description: "Join us for the biggest music festival of the summer!",
    date: "2024-07-25T12:00:00Z",
    time: "12:00 PM - 10:00 PM",
    location: "Central Park, New York",
    price: 49.99,
    category: "Music",
    image: "/assets/images/event-placeholder.jpg",
    organizer: {
      name: "Eventify Team",
      followers: 250
    }
  },
  {
    _id: '2',
    title: "AI Conference 2024",
    description: "Explore the future of artificial intelligence with industry leaders.",
    date: "2024-08-10T09:00:00Z",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, San Francisco",
    price: 149.99,
    category: "Tech",
    image: "/assets/images/event-placeholder.jpg",
    organizer: {
      name: "Tech Innovators",
      followers: 420
    }
  }
];

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const eventService = {
  // Get all events with filters
  getEvents: async (filters = {}) => {
    await delay(800);

    let filteredEvents = [...mockEvents];

    // ✅ Filter by category
    if (filters.category) {
      const categoryLower = filters.category.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.category?.toLowerCase() === categoryLower
      );
    }

    // ✅ Enhanced search: title, description, category, and organizer.name
    if (filters.search) {
      const searchLower = filters.search.toLowerCase().trim();
      
      // Return empty if search is empty
      if (searchLower === '') {
        return { data: [] };
      }

      filteredEvents = filteredEvents.filter(event => {
        const titleMatch = event.title?.toLowerCase().includes(searchLower);
        const descMatch = event.description?.toLowerCase().includes(searchLower);
        const categoryMatch = event.category?.toLowerCase().includes(searchLower);
        const organizerMatch = event.organizer?.name?.toLowerCase().includes(searchLower);
        
        return titleMatch || descMatch || categoryMatch || organizerMatch;
      });
    }

    return { data: filteredEvents };
  },

  // Get event by ID
  getEventById: async (eventId) => {
    await delay(600);

    const event = mockEvents.find(e => e._id === eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    return { data: event };
  },

  // Create event
  createEvent: async (eventData) => {
    await delay(1000);

    return { data: { ...eventData, _id: Date.now().toString() } };
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    await delay(800);

    return { data: { ...eventData, _id: eventId } };
  },

  // Delete event
  deleteEvent: async (eventId) => {
    await delay(600);

    return { data: { success: true } };
  },

  // Get user events (for organizers)
  getUserEvents: async () => {
    await delay(800);

    return { data: mockEvents };
  }
};

export default eventService;
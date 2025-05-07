import { Book } from "../BookDescriptionPage";

export const dummyBook: Book = {
    id: '1',
    title: 'European Adventure',
    description: 'A comprehensive guide to exploring Europe\'s hidden gems',
    tags: ['Europe', 'Culture', 'History'],
    imageUrl: 'https://example.com/europe.jpg',
    pages: [
      {
        id: 'p1',
        title: 'Paris Exploration',
        description: 'Discovering the heart of French culture',
        tips: 'Visit early morning to avoid crowds',
        images: ['https://example.com/paris1.jpg', 'https://example.com/paris2.jpg'],
        itineraries: [
          {
            id: 'i1',
            title: 'Eiffel Tower Visit',
            category: 'Attraction',
            location: { latitude: 48.8584, longitude: 2.2945 }
          },
          {
            id: 'i2',
            title: 'Louvre Museum Tour',
            category: 'Attraction',
            location: { latitude: 48.8606, longitude: 2.3376 }
          }
        ]
      },
      {
        id: 'p1',
        title: 'Paris Exploration',
        description: 'Discovering the heart of French culture',
        tips: 'Visit early morning to avoid crowds',
        images: ['https://example.com/paris1.jpg', 'https://example.com/paris2.jpg'],
        itineraries: [
          {
            id: 'i1',
            title: 'Eiffel Tower Visit',
            category: 'Attraction',
            location: { latitude: 48.8584, longitude: 2.2945 }
          },
          {
            id: 'i2',
            title: 'Louvre Museum Tour',
            category: 'Attraction',
            location: { latitude: 48.8606, longitude: 2.3376 }
          }
        ]
      }
    ]
  }
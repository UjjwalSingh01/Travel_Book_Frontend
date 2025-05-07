// ItineraryPage.tsx
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import Alert from '@/common_components/Alert';
import Loading from '@/common_components/Loading';
import { SearchBar } from '@/common_components/SearchBar';
import TravelFilterBar from '../../(Itinerary)/itinerary/components/FilterSection';
import BookCard from '@/common_components/BookCard';
import ItineraryCard from '@/common_components/ItineraryCard';

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  addedBy: {
    firstName: string;
    lastName: string;
  };
}
  
interface Itinerary {
  id: string;
  title: string;
  category: string;
  location: string;
  images: string[];
  ratings: {
    average: number;
    count: number;
  };
  addedBy: {
    firstName: string;
    lastName: string;
  };
}

const dummyData = {
    books: [
      {
        id: 'b1',
        title: 'European Adventure',
        imageUrl: 'https://example.com/europe.jpg',
        addedBy: {
          firstName: 'John',
          lastName: 'Doe'
        },
      },
      {
        id: 'b2',
        title: 'Asian Discovery',
        imageUrl: 'https://example.com/asia.jpg',
        addedBy: {
          firstName: 'Jane',
          lastName: 'Smith'
        },
      },
      {
        id: 'b3',
        title: 'My Travel Plans',
        imageUrl: 'https://example.com/plan1.jpg',
        addedBy: {
          firstName: 'Alice',
          lastName: 'Johnson'
        },
      },
      {
        id: 'b4',
        title: 'Dream Vacation',
        imageUrl: 'https://example.com/plan2.jpg',
        addedBy: {
          firstName: 'Bob',
          lastName: 'Williams'
        },
      }
    ],
    itineraries: [
      {
        id: 'i1',
        title: 'Eiffel Tower Visit',
        category: 'Attraction',
        location: 'Paris, France',
        images: ['https://example.com/eiffel1.jpg'],
        ratings: {
          average: 4.8,
          count: 1200
        },
        addedBy: {
          firstName: 'John',
          lastName: 'Doe'
        }
      },
      {
        id: 'i2',
        title: 'Louvre Museum Tour',
        category: 'Attraction',
        location: 'Paris, France',
        images: ['https://example.com/louvre1.jpg'],
        ratings: {
          average: 4.7,
          count: 950
        },
        addedBy: {
          firstName: 'Jane',
          lastName: 'Smith'
        }
      },
      {
        id: 'i3',
        title: 'Sushi Making Class',
        category: 'Activity',
        location: 'Tokyo, Japan',
        images: ['https://example.com/sushi1.jpg'],
        ratings: {
          average: 4.9,
          count: 800
        },
        addedBy: {
          firstName: 'Alice',
          lastName: 'Johnson'
        }
      },
      {
        id: 'i4',
        title: 'Beachfront Villa Stay',
        category: 'Hotel',
        location: 'Bali, Indonesia',
        images: ['https://example.com/bali1.jpg'],
        ratings: {
          average: 4.6,
          count: 1500
        },
        addedBy: {
          firstName: 'Bob',
          lastName: 'Williams'
        }
      }
    ]
  }

export const WishlistPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(dummyData.books);
  const [itineraries, setItineraries] = useState<Itinerary[]>(dummyData.itineraries);
  const [currentFilter, setCurrentFilter] = useState<"Books" | "Itinerary">("Books");
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  const handleFilterChange = (filter: "Books" | "Itinerary") => {
    setCurrentFilter(filter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/getWishlist`);
        
        if (response.data.success) {
          setBooks(response.data.formattedBooks);
          setItineraries(response.data.itineraries);
          setMessage(response.data.message);
          setAlertType('success');
          setShowAlert(true);
        } 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Sign-Up error:", error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error("Unexpected error:", error);
          setMessage("An unexpected error occurred.");
        }
        setAlertType("error");
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen relative"
    >
      {(showAlert) && (
        <Alert
          message={message} 
          type={alertType} 
          onClose={() => setShowAlert(false)}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
      <>
        <SearchBar />
        <TravelFilterBar onFilterChange={handleFilterChange} />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`grid gap-6 pb-20 px-6 md:px-24 lg:px-32 xl:px-56 ${
            currentFilter === "Books" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {/* Books Section */}
          {currentFilter === "Books" && books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              status={'Explored'}
              image={book.imageUrl}
            />
          ))}


          {/* Itineraries Section */}
          {/* {currentFilter === "Itinerary" && itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary._id}
              id={itinerary._id}
              title={itinerary.title}
              image={itinerary.images[0]}
              category={itinerary.category}
              location={itinerary.location}
              rating={itinerary.ratings.average}
              views={itinerary.ratings.count}
              addedBy={`${itinerary.addedBy.firstName} ${itinerary.addedBy.lastName}`}
            />
          ))} */}
        </motion.div>
      </>
      )}
    </motion.div>
  );
};
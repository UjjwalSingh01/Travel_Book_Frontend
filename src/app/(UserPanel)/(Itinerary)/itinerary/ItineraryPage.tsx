"use client"

import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import { AddToBookModal } from './components/AddToBookModal';
import Loading from '@/common_components/Loading';
import Alert from '@/common_components/Alert';
import { SearchBar } from '@/common_components/SearchBar';
import TravelFilterBar from './components/FilterSection';
import BookCard from '@/common_components/BookCard';
import ItineraryCard from '@/common_components/ItineraryCard';

interface Itinerary {
  id: string;
  title: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string;
  rating: number;
  views: number;
  addedBy: {
    firstName: string;
    lastName: string;
  };
}

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  addedBy: {
    firstName: string;
    lastName: string;
  };
}


export const ItineraryPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>();
  const [itineraries, setItineraries] = useState<Itinerary[]>();
  const [selectedItinerary, setSelectedItinerary] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<"Books" | "Itinerary">("Books");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  const handleFilterChange = (filter: "Books" | "Itinerary") => {
    setCurrentFilter(filter);
    // console.log(filter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/getItineraries`);
        
        if (response.data.success) {
          setBooks(response.data.data.books);
          setItineraries(response.data.data.itineraries);
          setMessage(response.data.message);
          setAlertType("success");
          setShowAlert(true);
        } 
      } catch (error) {
        setAlertType("error");
        setShowAlert(true);
        if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error('Unexpected error:', error);
          setMessage("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddToBook = (itineraryId: string) => {
    setSelectedItinerary(itineraryId);
    setShowAddModal(true);
  };

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
            {currentFilter === "Books" && books?.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                status={'Explored'}
                image={book.imageUrl}
              />
            ))}

            {/* Itineraries Section */}
            {currentFilter === "Itinerary" && itineraries?.map((itinerary) => (
              <ItineraryCard
                key={itinerary.id}
                id={itinerary.id}
                title={itinerary.title}
                image={itinerary.images[0]}
                category={itinerary.category}
                location={itinerary.location}
                rating={itinerary.rating} 
                views={itinerary.views}
                addedBy={`${itinerary.addedBy.firstName} ${itinerary.addedBy.lastName}`}
                onAddToWishlist={() => {/* API call */}}
                onAddToBook={() => handleAddToBook(itinerary.id)}
              />
            ))}
          </motion.div>

          <AddToBookModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            itineraryId={selectedItinerary}
          />
        </>
      )}
    </motion.div>
  );
};
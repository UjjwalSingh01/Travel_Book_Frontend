'use client'

import React, { useState, useEffect } from 'react'
import { bookCardsData } from './constants/constant';
import { FilterComponents } from './components/FilterComponents';
import axios from 'axios';
import Alert from '@/common_components/Alert';
import Loading from '@/common_components/Loading';
import { SearchBar } from '@/common_components/SearchBar';
import BookCard from '@/common_components/BookCard';

export interface Book {
  id: string;
  title: string;
  imageUrl: string;
  visibility: "Public" | "Private";
  status: "Explored" | "Planning";
}

export const MyTravelBookPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<"Explored" | "Planning">("Explored")
  const [books, setBooks] = useState<Book[]>(bookCardsData)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book/myBooks`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setBooks(response.data.data);
          setMessage(response.data.message);
          setAlertType('success');
          setShowAlert(true);
        } 

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Backend error:', error.response?.data);
          setMessage(error.response?.data?.message);
        } else {
          console.error('Unexpected error:', error);
          setMessage('An unexpected error occurred');
        }
        setAlertType('error');
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className="px-5 pt-8 min-h-screen">
      {(showAlert) && (
        <Alert
          message={message}
          type={alertType}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SearchBar />
          
          {/* Pass props to FilterComponents */}
          <FilterComponents selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
          
          <main className="flex justify-center pb-8 max-h-screen overflow-x-hidden scrollbar-hide">
            <div className="w-full mx-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {books
                .filter((book) => book.status === selectedStatus) 
                .map((book, index) => (
                <BookCard key={index} id={book.id} title={book.title} image={book.imageUrl} status={book.status} />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  )
}
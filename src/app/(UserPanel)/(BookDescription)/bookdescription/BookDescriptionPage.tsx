'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Alert from '@/common_components/Alert'
import Loading from '@/common_components/Loading'
import { dummyBook } from '../bookDescription/constants/dummyData'
import PageComponent from '../bookDescription/components/PageComponent'

export interface Itinerary {
  id: string
  title: string
  category: string
  location: {
    latitude: number
    longitude: number
  }
}

export interface Page {
  id: string
  title: string
  description?: string
  tips?: string
  images: string[]
  itineraries: Itinerary[]
}

export interface Book {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  pages: Page[]
}

const BookDescriptionPage = () => {
  const { id }: {id: string} = useParams();
  const [book, setBook] = useState<Book>(dummyBook)
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchBookDescription = async() => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/book/getBookDescription/${id}`, {
          withCredentials: true
        })

        if (response.data.success) {
          setBook(response.data.data);
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

    fetchBookDescription();
  },[id])

  return (
    <div className="relative min-h-screen overflow-y-auto scrollbar-hide bg-gray-50">
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
      ) : book ? (
      <>
        <div className="relative h-96">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <div className="flex gap-2">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-lg text-gray-700 mb-8">{book.description}</p>

          {book.pages.map((page) => (
            <PageComponent key={page.id} page={page} />
          ))}
        </div>
      </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">No book data available</p>
        </div>
      )}
    </div>
  )
}

export default BookDescriptionPage;
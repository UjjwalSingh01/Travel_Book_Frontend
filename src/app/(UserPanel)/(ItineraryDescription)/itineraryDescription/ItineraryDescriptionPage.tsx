'use client'

import React, { useEffect, useState } from 'react'
import Banner from './components/Banner'
import ExperienceSection from './components/ExperienceSection'
import axios from 'axios'
import HighlightSection from './components/HighlightSection'
import { useParams } from 'next/navigation'
import Alert from '@/common_components/Alert'
import Loading from '@/common_components/Loading'

export interface Highlight {
  image: string[];
  // title: string;
  // author: string;
  // description: string;
}

export interface Experience {
  id: number;
  user: {
    name: string;
    avatar: string;
  }
  experience: string;
  upVotes: number;
}

export interface ItineraryDetails {
  banner: {
    image: string;
    title: string;
    addedBy: string;
    lastUpdatedAt: string;
  };
  caption: string;
  highlights: Highlight[];
  experiences: Experience[];
}

const ItineraryDescriptionPage: React.FC = () => {
  const { id }: {id: string} = useParams();
  const [itinerary, setItinerary] = useState<ItineraryDetails>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchItineraryDescription = async() => {
      setIsLoading(true);
      
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/getItineraryDescritpion/${id}`, {
          withCredentials: true
        })

        if(response.data.success) {
          setItinerary(response.data.data);
          setMessage(response.data.message);
          setAlertType('success')
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

    fetchItineraryDescription();
  },[])


  return (
    <div className="p-10 relative">
      {(showAlert) && (
        <Alert
          message={message} 
          type={alertType} 
          onClose={() => {
            setShowAlert(false)
          }}
        />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner 
            image={itinerary?.banner.image || ""}
            title={itinerary?.banner.title || ""}
            author={itinerary?.banner.addedBy || ""}
            updatedAt={itinerary?.banner.lastUpdatedAt || ""}
          />

          {/* Description Section */}
          <div className="flex-row md:flex text-center justify-center items-center gap-5 w-full my-6 md:px-20">
            <div className="md:w-1/5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-red-300 font-bold text-gray-800">Windy walled city for surf and seafood</h3>
            </div>
            <div className="md:w-4/5">
              <p className="bg-red-400 text-lg md:text-xl lg:text-2xl xl:text-3xl italic text-gray-600">
                “With its charming medina, vibrant street life, fishing heritage, and vast beach, 
                this port city offers a sun-kissed break with fresh seafood at every turn and 
                gusty winds that kick up the surf.”
              </p>
            </div>
          </div>

          <HighlightSection highlights={itinerary?.highlights || []} />
          <ExperienceSection 
            experiences={itinerary?.experiences || []} 
            itineraryId={id} 
          />
        </>
      )}
    </div>
  )
}

export default ItineraryDescriptionPage;
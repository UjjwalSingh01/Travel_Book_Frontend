'use client';

import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import ExperienceSection from './components/ExperienceSection';
import HighlightSection from './components/HighlightSection';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Alert from '@/common_components/Alert';
import Loading from '@/common_components/Loading';

export interface Highlight {
  image: string[];
}

export interface Experience {
  id: number;
  user: { name: string; avatar: string };
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
  const params = useParams();
  const id = params.slug as string;
  const [itinerary, setItinerary] = useState<ItineraryDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchItineraryDescription = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/itinerary/getItineraryDescritpion/${id}`, {
          withCredentials: true
        });

        if (response.data.success) {
          setItinerary(response.data.data);
          setMessage(response.data.message);
          setAlertType('success');
          setShowAlert(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data?.message || 'An error occurred');
        } else {
          setMessage('An unexpected error occurred');
        }
        setAlertType('error');
        setShowAlert(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraryDescription();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-8 relative min-h-screen bg-white">
      {showAlert && (
        <Alert message={message} type={alertType} onClose={() => setShowAlert(false)} />
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner
            image={itinerary?.banner.image || ''}
            title={itinerary?.banner.title || ''}
            author={itinerary?.banner.addedBy || ''}
            updatedAt={itinerary?.banner.lastUpdatedAt || ''}
          />

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full my-10 text-center md:text-left">
            <div className="w-full md:w-1/3">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Windy walled city for surf and seafood
              </h3>
            </div>
            <div className="w-full md:w-2/3">
              <p className="text-base sm:text-lg lg:text-xl italic text-gray-600">
                “With its charming medina, vibrant street life, fishing heritage, and vast beach,
                this port city offers a sun-kissed break with fresh seafood at every turn and
                gusty winds that kick up the surf.”
              </p>
            </div>
          </div>

          <HighlightSection highlights={Array.isArray(itinerary?.highlights) ? itinerary.highlights : []} />
          <ExperienceSection
            experiences={Array.isArray(itinerary?.experiences) ? itinerary.experiences : []}
            itineraryId={id}
          />
        </>
      )}
    </div>
  );
};

export default ItineraryDescriptionPage;
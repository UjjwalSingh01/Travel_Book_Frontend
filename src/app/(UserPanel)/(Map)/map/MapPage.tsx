"use client"

import React, { useEffect, useState } from "react";
import VisitedPlacesMap, { Place } from "./components/VisitedPlacesMap";
import axios from "axios";

// TypeScript: Example array of 5 dummy places
export const dummyPlaces: Place[] = [
  {
    pageId: "1",
    location: {
      latitude: 27.1751,
      longitude: 78.0421,
      address: "Taj Mahal, Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh, India"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
  },
  {
    pageId: "2",
    location: {
      latitude: 28.6129,
      longitude: 77.2295,
      address: "India Gate, Rajpath, India Gate, New Delhi, Delhi, India"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/India_Gate_in_New_Delhi_03-2016.jpg"
  },
  {
    pageId: "3",
    location: {
      latitude: 28.5244,
      longitude: 77.1855,
      address: "Qutub Minar, Seth Sarai, Mehrauli, New Delhi, Delhi, India"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Qutb_Minar_3.jpg"
  },
  {
    pageId: "4",
    location: {
      latitude: 18.9218,
      longitude: 72.8347,
      address: "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra, India"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Gateway_of_India_Mumbai.jpg"
  },
  {
    pageId: "5",
    location: {
      latitude: 17.3616,
      longitude: 78.4747,
      address: "Charminar, Char Kaman, Ghansi Bazaar, Hyderabad, Telangana, India"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Charminar_Hyderabad_2.jpg"
  }
];


const VisitedPlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>(dummyPlaces);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/user/places`, { withCredentials: true })
  //     .then((res) => setPlaces(res.data))
  //     .catch((err) => {
  //       setPlaces([]);
  //       console.error("Could not fetch places", err);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <div>Loading map...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1 className="text-2xl font-bold mb-6">Your Visited Places</h1>
      <VisitedPlacesMap places={places} />
    </div>
  );
};

export default VisitedPlacesPage;

"use client"

import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import TravelQuoteSection from './components/TravelQuoteSection'
import Newsletter from './components/NewsLetter'
import ConnectWithTravelers from './components/ConnectWithTraveller'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    console.log('Url: ', process.env.NEXT_PUBLIC_API_URL)
  }, [])

  return (
    <main>
      <HeroSection />
      <FeatureSection />
      <TravelQuoteSection />
      <ConnectWithTravelers />
      <Newsletter />
    </main>
  )
}

export default HomePage
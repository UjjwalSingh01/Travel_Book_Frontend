import HeroSection from './components/HeroSection'
import FeatureSection from './components/FeatureSection'
import TravelQuoteSection from './components/TravelQuoteSection'
import Newsletter from './components/NewsLetter'
import ConnectWithTravelers from './components/ConnectWithTraveller'

const HomePage = () => {
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
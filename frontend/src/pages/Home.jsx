import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TrustIndicators from '../components/TrustIndicators';
import HoroscopeForm from '../components/HoroscopeForm';
import GuidanceCategories from '../components/GuidanceCategories';
import AstrologersList from '../components/AstrologersList';
import PujaServices from '../components/PujaServices';
import HowItWorks from '../components/HowItWorks';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TrustIndicators />
      <HoroscopeForm />
      <GuidanceCategories />
      <AstrologersList />
      <PujaServices />
      <HowItWorks />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Home;
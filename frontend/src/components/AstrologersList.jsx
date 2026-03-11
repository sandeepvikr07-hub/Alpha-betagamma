import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { astrologers } from '../data/mock';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const AstrologersList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 4;

  const handleConsultNow = (astrologer) => {
    navigate('/booking', { 
      state: { 
        service: { 
          title: `Astrology Consultation - ${astrologer.name}`,
          description: astrologer.specialization,
          price: 999
        } 
      } 
    });
  };

  const nextSlide = () => {
    setStartIndex((prev) => 
      (prev + itemsPerView) % astrologers.length
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) => 
      (prev - itemsPerView + astrologers.length) % astrologers.length
    );
  };

  const visibleAstrologers = [];
  for (let i = 0; i < itemsPerView; i++) {
    visibleAstrologers.push(astrologers[(startIndex + i) % astrologers.length]);
  }

  return (
    <section id="astrologers" className="py-16 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('astrologersList.title')}
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-orange-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-orange-600" />
          </button>

          {/* Astrologers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {visibleAstrologers.map((astrologer) => (
              <div
                key={astrologer.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-md">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-800">{astrologer.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {astrologer.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {astrologer.specialization}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{t('astrologersList.exp')} {astrologer.experience} {t('astrologersList.years')}</span>
                    <span>{astrologer.consultations}+ {t('astrologersList.consultations')}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                    onClick={() => handleConsultNow(astrologer)}
                  >
                    Consult Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            {t('astrologersList.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AstrologersList;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { pujaServices } from '../data/mock';
import { Clock, IndianRupee } from 'lucide-react';
import { Button } from './ui/button';

const PujaServices = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleBookNow = (service) => {
    navigate('/booking', { state: { service } });
  };

  return (
    <section id="pujas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pujaServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-3 left-3 right-3 text-white font-bold text-lg">
                  {service.title}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 font-semibold text-orange-600">
                    <IndianRupee className="h-4 w-4" />
                    <span>{service.price}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  {t('services.bookNow')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            {t('services.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PujaServices;
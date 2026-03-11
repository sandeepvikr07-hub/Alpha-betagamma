import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users, Sparkles, Star } from 'lucide-react';

const TrustIndicators = () => {
  const { t } = useLanguage();

  const indicators = [
    {
      icon: Award,
      value: '10+',
      label: t('trust.experience'),
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Users,
      value: '200+',
      label: t('trust.astrologers'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Sparkles,
      value: '150,000+',
      label: t('trust.pujas'),
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: t('trust.rating'),
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {t('trust.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${indicator.color} mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {indicator.value}
                </h3>
                <p className="text-gray-600 text-sm font-medium">
                  {indicator.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
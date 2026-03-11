import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Briefcase, Coins, Users, HeartPulse, BookOpen } from 'lucide-react';
import { guidanceCategories } from '../data/mock';

const iconMap = {
  Heart: Heart,
  Briefcase: Briefcase,
  Coins: Coins,
  Users: Users,
  BookOpen: BookOpen
};

const GuidanceCategories = () => {
  const { t } = useLanguage();

  const categories = [
    {
      icon: Heart,
      title: 'Love & Marriage',
      description: 'Compatibility, relationship guidance, marriage pujas',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      icon: Briefcase,
      title: 'Career & Business',
      description: 'Career astrology, business growth pujas',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Coins,
      title: 'Money & Wealth',
      description: 'Remedies for prosperity & financial success',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Family & Children',
      description: 'Child conception, family harmony, vastu',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: HeartPulse,
      title: 'Health & Peace',
      description: 'Dosha remedies & wellness pujas',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Education & Knowledge',
      description: 'Academic success and wisdom blessings',
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {t('guidance.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${category.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuidanceCategories;
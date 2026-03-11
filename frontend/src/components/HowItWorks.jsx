import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, CheckCircle, Calendar } from 'lucide-react';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Calendar,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-red-300" />
                )}

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${step.color}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
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

export default HowItWorks;
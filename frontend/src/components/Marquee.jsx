import React from 'react';
import { Globe } from 'lucide-react';

const Marquee = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap inline-block">
        <span className="inline-flex items-center space-x-3 mx-8 text-lg font-semibold">
          <Globe className="h-5 w-5" />
          <span>Sanatani Pandits & Poojas available in US, Europe, and Canada. (No service in Middle East or Africa)</span>
        </span>
        <span className="inline-flex items-center space-x-3 mx-8 text-lg font-semibold">
          <Globe className="h-5 w-5" />
          <span>Sanatani Pandits & Poojas available in US, Europe, and Canada. (No service in Middle East or Africa)</span>
        </span>
        <span className="inline-flex items-center space-x-3 mx-8 text-lg font-semibold">
          <Globe className="h-5 w-5" />
          <span>Sanatani Pandits & Poojas available in US, Europe, and Canada. (No service in Middle East or Africa)</span>
        </span>
      </div>
    </div>
  );
};

export default Marquee;

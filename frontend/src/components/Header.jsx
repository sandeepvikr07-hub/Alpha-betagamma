import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
];

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">ॐ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ProudSanatani.shop
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.home')}
            </a>
            <a href="#astrologers" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.astrologers')}
            </a>
            <a href="#pujas" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.pujas')}
            </a>
            <a href="#shop" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.shop')}
            </a>
            <a href="#blog" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.blog')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              {t('header.contact')}
            </a>
          </nav>

          {/* Language Dropdown & Auth */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  {currentLanguage.nativeName}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'bg-orange-50 text-orange-600' : ''}`}
                  >
                    {lang.nativeName} ({lang.name})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                className="text-orange-600 hover:text-orange-700"
                onClick={() => navigate('/login')}
              >
                {t('header.login')}
              </Button>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                onClick={() => navigate('/signup')}
              >
                {t('header.signup')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.home')}
              </a>
              <a href="#astrologers" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.astrologers')}
              </a>
              <a href="#pujas" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.pujas')}
              </a>
              <a href="#shop" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.shop')}
              </a>
              <a href="#blog" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.blog')}
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">
                {t('header.contact')}
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-orange-100">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  {t('header.login')}
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                  onClick={() => navigate('/signup')}
                >
                  {t('header.signup')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
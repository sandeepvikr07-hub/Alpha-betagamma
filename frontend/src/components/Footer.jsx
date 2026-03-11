import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-gradient-to-br from-orange-900 to-red-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-orange-600 font-bold text-xl">ॐ</span>
              </div>
              <span className="text-xl font-bold">ProudSanatani</span>
            </div>
            <p className="text-orange-100 text-sm">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-orange-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('header.home')}
                </a>
              </li>
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">
                  {t('header.astrologers')}
                </a>
              </li>
              <li>
                <a href="#pujas" className="hover:text-white transition-colors">
                  {t('header.pujas')}
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  {t('header.blog')}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-orange-100">
              <li><a href="#" className="hover:text-white transition-colors">Kshetra Pujas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Samoohika Pujas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parihara Pujas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Homas</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-orange-100">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">contact@proudsanatani.shop</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+91 8434411419</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Hyderabad, Telangana, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-orange-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-orange-100 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Facebook">

                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Twitter">

                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Instagram">

                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Youtube">

                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;
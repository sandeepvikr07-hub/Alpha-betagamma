import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, MapPin, User, Mail, Phone, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const HoroscopeForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    pob: '',
    gender: 'male',
    email: '',
    phone: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare WhatsApp message
    const whatsappNumber = '918434411419';
    const message = `🔮 Free Horoscope Request\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📅 DOB: ${formData.dob}\n` +
      `📍 Place of Birth: ${formData.pob}\n` +
      `⚧ Gender: ${formData.gender}\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `${formData.time ? `🕐 Time: ${formData.time}\n` : ''}` +
      `\n✨ From: ProudSanatani.shop`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show popup
    setShowDialog(true);

    // Reset form
    setFormData({
      name: '',
      dob: '',
      pob: '',
      gender: 'male',
      email: '',
      phone: '',
      time: ''
    });

    // Auto close dialog after 3 seconds
    setTimeout(() => {
      setShowDialog(false);
    }, 3000);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t('horoscope.title')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t('horoscope.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    {t('horoscope.name')} *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-gray-700 font-medium">
                    {t('horoscope.dob')} *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="dob"
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Place of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="pob" className="text-gray-700 font-medium">
                    {t('horoscope.pob')} *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="pob"
                      type="text"
                      required
                      placeholder="Enter place of birth"
                      value={formData.pob}
                      onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Time (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-gray-700 font-medium">
                    Time (Optional)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-700 font-medium">
                    {t('horoscope.gender')} *
                  </Label>
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{t('horoscope.male')}</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{t('horoscope.female')}</span>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('horoscope.submit')}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Request Submitted!
            </DialogTitle>
            <DialogDescription className="text-center text-lg pt-4">
              We will share your details shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HoroscopeForm;
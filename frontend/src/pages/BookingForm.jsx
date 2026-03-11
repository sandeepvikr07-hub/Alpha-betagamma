import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { getRandomQuote } from '../data/quotes';
import { User, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const serviceDetails = location.state?.service || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: serviceDetails.title || '',
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [quote, setQuote] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get random quotation
    const selectedQuote = getRandomQuote();
    setQuote(selectedQuote);
    setSubmitted(true);

    // Show success toast
    toast({
      title: "Booking Request Submitted!",
      description: "We will contact you shortly with a customized plan.",
    });

    // Prepare WhatsApp message
    const whatsappNumber = '918434411419'; // From footer
    const message = `🙏 New Service Booking Request\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `📧 Email: ${formData.email}\n` +
      `📍 Address: ${formData.address}\n` +
      `🛕 Service: ${formData.service}\n` +
      `${formData.additionalInfo ? `📝 Additional Info: ${formData.additionalInfo}\n` : ''}` +
      `\n✨ From: ProudSanatani.shop`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp after 3 seconds
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 mb-6">
                <Sparkles className="h-10 w-10 text-white" />
              </div>

              {/* Thank You Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Thank You for Choosing Our Services!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We will review your details and reach out with a customized plan shortly.
              </p>

              {/* Dharma Quotation */}
              {quote && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-8 border-l-4 border-orange-500">
                  <p className="text-xl font-semibold text-orange-900 mb-2">
                    {quote.text}
                  </p>
                  <p className="text-lg text-gray-700 italic mb-3">
                    "{quote.translation}"
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    — {quote.source}
                  </p>
                </div>
              )}

              {/* WhatsApp Info */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  📱 You will be redirected to WhatsApp in a moment to continue the conversation...
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      service: '',
                      additionalInfo: ''
                    });
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  Book Another Service
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Book Your Service
            </h1>
            <p className="text-lg text-gray-600">
              Fill in your details and we'll create a personalized plan for you
            </p>
            {serviceDetails.title && (
              <div className="mt-4 inline-block bg-orange-100 px-4 py-2 rounded-full">
                <span className="text-orange-800 font-semibold">Selected: {serviceDetails.title}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name *
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
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address *
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
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 font-medium">
                Complete Address *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Textarea
                  id="address"
                  required
                  placeholder="Enter your complete address with city, state, country"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="pl-10 min-h-20"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-gray-700 font-medium">
                Service *
              </Label>
              <Input
                id="service"
                type="text"
                required
                placeholder="Service name"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              />
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-gray-700 font-medium">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any specific requirements or questions?"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="min-h-24"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6"
            >
              Submit Booking Request
            </Button>

            {/* Info */}
            <p className="text-sm text-gray-500 text-center">
              By submitting, you agree to be contacted via phone, email, or WhatsApp
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;
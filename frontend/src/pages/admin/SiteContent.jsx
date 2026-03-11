import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { Pencil, Save } from 'lucide-react';

const SiteContent = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const [content, setContent] = useState({
    heroTitle1: 'Accurate Remedies from',
    heroTitle2: 'Expert Astrologers',
    heroSubtitle: 'Experience authentic Vedic wisdom and spiritual guidance',
    trustTitle: 'Why Choose ProudSanatani',
    horoscopeTitle: 'Get Your Free Horoscope Report',
    horoscopeSubtitle: 'Know your planetary strengths, life predictions, and remedies',
    contactEmail: 'contact@proudsanatani.shop',
    contactPhone: '+91 8434411419',
    contactAddress: 'Hyderabad, Telangana, India',
    marqueeText: 'Sanatani Pandits & Poojas available in US, Europe, and Canada. (No service in Middle East or Africa)'
  });

  const handleSave = (field) => {
    // Here you would save to backend
    toast({
      title: "Content Updated!",
      description: `${field} has been updated successfully.`,
    });
    setEditing(null);
  };

  const ContentField = ({ label, field, multiline = false }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {editing === field ? (
          <Button
            size="sm"
            onClick={() => handleSave(field)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditing(field)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {editing === field ? (
          multiline ? (
            <Textarea
              value={content[field]}
              onChange={(e) => setContent({ ...content, [field]: e.target.value })}
              className="w-full"
              rows={3}
            />
          ) : (
            <Input
              value={content[field]}
              onChange={(e) => setContent({ ...content, [field]: e.target.value })}
              className="w-full"
            />
          )
        ) : (
          <p className="text-gray-700">{content[field]}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Content Management</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Hero Section</h2>
          <ContentField label="Hero Title Line 1" field="heroTitle1" />
          <ContentField label="Hero Title Line 2" field="heroTitle2" />
          <ContentField label="Hero Subtitle" field="heroSubtitle" multiline />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Marquee</h2>
          <ContentField label="Marquee Message" field="marqueeText" multiline />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Trust Section</h2>
          <ContentField label="Trust Section Title" field="trustTitle" />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Horoscope Form</h2>
          <ContentField label="Form Title" field="horoscopeTitle" />
          <ContentField label="Form Subtitle" field="horoscopeSubtitle" multiline />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Contact Information</h2>
          <ContentField label="Email" field="contactEmail" />
          <ContentField label="Phone" field="contactPhone" />
          <ContentField label="Address" field="contactAddress" />
        </div>
      </div>
    </div>
  );
};

export default SiteContent;
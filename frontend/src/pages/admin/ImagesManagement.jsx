import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { Pencil, Save } from 'lucide-react';

const ImagesManagement = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const [images, setImages] = useState({
    heroSlide1: 'https://images.unsplash.com/photo-1565195161077-f5c5f61f9ea2',
    heroSlide2: 'https://images.unsplash.com/photo-1631556373338-52e31188effc',
    heroSlide3: 'https://images.unsplash.com/photo-1573352763925-82bd5dfc31d1',
    blog1: 'https://images.unsplash.com/photo-1573352763925-82bd5dfc31d1',
    blog2: 'https://images.unsplash.com/photo-1715876722520-02ccc9248dab',
    blog3: 'https://images.unsplash.com/photo-1686582557983-0df22fd25187'
  });

  const handleSave = (field) => {
    toast({
      title: "Image Updated!",
      description: `${field} URL has been updated successfully.`,
    });
    setEditing(null);
  };

  const imageFields = [
    { key: 'heroSlide1', label: 'Hero Slide 1' },
    { key: 'heroSlide2', label: 'Hero Slide 2' },
    { key: 'heroSlide3', label: 'Hero Slide 3' },
    { key: 'blog1', label: 'Blog Image 1' },
    { key: 'blog2', label: 'Blog Image 2' },
    { key: 'blog3', label: 'Blog Image 3' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Images Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {imageFields.map(({ key, label }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              {editing === key ? (
                <Button
                  size="sm"
                  onClick={() => handleSave(key)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditing(key)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={images[key]}
                  alt={label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              </div>

              {/* URL Input */}
              {editing === key ? (
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={images[key]}
                    onChange={(e) => setImages({ ...images, [key]: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <p className="text-xs text-gray-500 truncate">{images[key]}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImagesManagement;
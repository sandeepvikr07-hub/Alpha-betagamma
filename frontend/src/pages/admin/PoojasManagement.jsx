import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

const PoojasManagement = () => {
  const { toast } = useToast();
  const [poojas, setPoojas] = useState([
    {
      id: 1,
      title: 'Kshetra Pujas',
      description: 'Sacred temple pujas at holy sites',
      image: 'https://images.unsplash.com/photo-1631556373338-52e31188effc',
      price: 2100,
      duration: '2-3 hours'
    },
    {
      id: 2,
      title: 'Navagraha Puja',
      description: 'Nine planets worship for harmony',
      image: 'https://images.unsplash.com/photo-1621787084849-ed98731b3071',
      price: 3200,
      duration: '2-3 hours'
    }
  ]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: 0,
    duration: ''
  });

  const handleEdit = (pooja) => {
    setFormData(pooja);
    setEditing(pooja.id);
  };

  const handleSave = () => {
    const updatedPoojas = poojas.map(p => 
      p.id === editing ? { ...p, ...formData } : p
    );
    setPoojas(updatedPoojas);
    toast({
      title: "Pooja Updated!",
      description: "The pooja has been updated successfully.",
    });
    setEditing(null);
    setFormData({ title: '', description: '', image: '', price: 0, duration: '' });
  };

  const handleDelete = (id) => {
    setPoojas(poojas.filter(p => p.id !== id));
    toast({
      title: "Pooja Deleted!",
      description: "The pooja has been removed.",
    });
  };

  const handleAdd = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Incomplete Data",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPooja = {
      ...formData,
      id: Date.now()
    };
    setPoojas([...poojas, newPooja]);
    setFormData({ title: '', description: '', image: '', price: 0, duration: '' });
    setAdding(false);
    toast({
      title: "Pooja Added!",
      description: "New pooja has been added successfully.",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Poojas Management</h1>
        <Button
          onClick={() => setAdding(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Pooja
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <Card className="mb-6 border-2 border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{adding ? 'Add New Pooja' : 'Edit Pooja'}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setAdding(false);
                  setEditing(null);
                  setFormData({ title: '', description: '', image: '', price: 0, duration: '' });
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Ganesh Puja"
                />
              </div>
              <div>
                <Label>Duration *</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2-3 hours"
                />
              </div>
            </div>
            
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter pooja description"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Image URL *</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="2100"
                />
              </div>
            </div>

            <Button
              onClick={adding ? handleAdd : handleSave}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600"
            >
              <Save className="h-4 w-4 mr-2" />
              {adding ? 'Add Pooja' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Poojas List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poojas.map((pooja) => (
          <Card key={pooja.id} className="overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={pooja.image}
                alt={pooja.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{pooja.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{pooja.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{pooja.duration}</span>
                <span className="font-semibold text-orange-600">₹{pooja.price}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(pooja)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(pooja.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PoojasManagement;

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

const QuotationsManagement = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState([
    {
      text: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
      translation: "You have the right to perform your duty, but not to the fruits of your actions.",
      source: "Bhagavad Gita 2.47"
    },
    {
      text: "योगः कर्मसु कौशलम्।",
      translation: "Yoga is excellence in action.",
      source: "Bhagavad Gita 2.50"
    },
    {
      text: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।",
      translation: "May all be happy, may all be free from disease.",
      source: "Vedic Mantra"
    }
  ]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newQuote, setNewQuote] = useState({
    text: '',
    translation: '',
    source: ''
  });

  const handleEdit = (index) => {
    setEditing(index);
  };

  const handleSave = (index) => {
    toast({
      title: "Quote Updated!",
      description: "The quotation has been updated successfully.",
    });
    setEditing(null);
  };

  const handleDelete = (index) => {
    const newQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(newQuotes);
    toast({
      title: "Quote Deleted!",
      description: "The quotation has been removed.",
    });
  };

  const handleAdd = () => {
    if (!newQuote.text || !newQuote.translation || !newQuote.source) {
      toast({
        title: "Incomplete Data",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    setQuotes([...quotes, newQuote]);
    setNewQuote({ text: '', translation: '', source: '' });
    setAdding(false);
    toast({
      title: "Quote Added!",
      description: "New quotation has been added successfully.",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quotations Management</h1>
        <Button
          onClick={() => setAdding(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Quote
        </Button>
      </div>

      {/* Add New Quote Form */}
      {adding && (
        <Card className="mb-6 border-2 border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Add New Quotation</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAdding(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Sanskrit/Original Text</Label>
              <Textarea
                value={newQuote.text}
                onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                placeholder="Enter Sanskrit or original text"
                rows={2}
              />
            </div>
            <div>
              <Label>English Translation</Label>
              <Textarea
                value={newQuote.translation}
                onChange={(e) => setNewQuote({ ...newQuote, translation: e.target.value })}
                placeholder="Enter English translation"
                rows={2}
              />
            </div>
            <div>
              <Label>Source</Label>
              <Input
                value={newQuote.source}
                onChange={(e) => setNewQuote({ ...newQuote, source: e.target.value })}
                placeholder="e.g., Bhagavad Gita 2.47"
              />
            </div>
            <Button
              onClick={handleAdd}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Add Quotation
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="text-gray-700">Quote #{index + 1}</span>
                <div className="flex gap-2">
                  {editing === index ? (
                    <Button
                      size="sm"
                      onClick={() => handleSave(index)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(index)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing === index ? (
                <>
                  <div>
                    <Label>Sanskrit/Original Text</Label>
                    <Textarea
                      value={quote.text}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[index].text = e.target.value;
                        setQuotes(newQuotes);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>English Translation</Label>
                    <Textarea
                      value={quote.translation}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[index].translation = e.target.value;
                        setQuotes(newQuotes);
                      }}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Source</Label>
                    <Input
                      value={quote.source}
                      onChange={(e) => {
                        const newQuotes = [...quotes];
                        newQuotes[index].source = e.target.value;
                        setQuotes(newQuotes);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <p className="text-lg font-semibold text-orange-900 mb-2">{quote.text}</p>
                    <p className="text-gray-700 italic mb-2">"{quote.translation}"</p>
                    <p className="text-sm text-gray-600">— {quote.source}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuotationsManagement;
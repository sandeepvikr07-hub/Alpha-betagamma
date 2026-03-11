export const sanatanaDharmaQuotes = [
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
  },
  {
    text: "वसुधैव कुटुम्बकम्।",
    translation: "The world is one family.",
    source: "Maha Upanishad 6.71"
  },
  {
    text: "अहिंसा परमो धर्मः।",
    translation: "Non-violence is the highest virtue.",
    source: "Mahabharata"
  },
  {
    text: "सत्यमेव जयते।",
    translation: "Truth alone triumphs.",
    source: "Mundaka Upanishad 3.1.6"
  }
];

export const getRandomQuote = () => {
  return sanatanaDharmaQuotes[Math.floor(Math.random() * sanatanaDharmaQuotes.length)];
};
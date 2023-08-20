'use client'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { FaTwitter , FaTumblr } from 'react-icons/fa';

import { useState, useEffect } from 'react';

interface Quote {
  quote: string;
  author: string;
}
const backgroundColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
];
export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [currentBackground, setCurrentBackground] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
      });
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const getRandomBackground = () => {
    const randomColorIndex = Math.floor(Math.random() * backgroundColors.length);
    setCurrentBackground(backgroundColors[randomColorIndex]);
  };
  useEffect(() => {
    getRandomQuote();
    getRandomBackground();
  }, [quotes]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentBackground}`}>
      <div className="p-8 max-w-md rounded-lg shadow-lg  bg-white">
     <FaQuoteLeft/>
        {currentQuote && (
          <blockquote className="text-xl italic">
            <p className="mb-4">{currentQuote.quote}</p>
            <FaQuoteRight />
            <cite className="block text-right">{currentQuote.author}</cite>
          </blockquote>
        )}
       <div className="flex  pt-8">
       <FaTwitter className="mr-2 text-2xl shadow-md" />
  <FaTumblr className="ml-2 text-2xl shadow-lg" />
</div>
      <button
  className={`mt-4 ${currentBackground} text-white px-4 py-2 rounded-lg mx-32`}
  onClick={() => {
    getRandomQuote();
    getRandomBackground();
  }}
>
  Next Quote
</button>


      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import Card from './Card';
import SearchComponent from './SearchComponent';
import ChatbotButton from './ChatbotButton';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [allCards, setAllCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');

  

  useEffect(() => {
    const fetchCards = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search?tags=${tags}&query=${query}`);
      setAllCards(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
    fetchCards()
  },[tags, query]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    setCurrentCards(allCards.slice(startIndex, endIndex));
  }, [currentPage, allCards, cardsPerPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(allCards.length / cardsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (searchTags, searchQuery) => {
    setTags(searchTags);
    setQuery(searchQuery);
    setCurrentPage(1); // Reset page when performing a new search
  };

  return (
    <div className='App-body'>
      <header>
        <h1 className='heading'>Dataset Downloader</h1>
        <SearchComponent onSearch={handleSearch} />
      </header>
      <div className='card-body'>
        {currentCards.map((card) => (
          <Card heading={card.title} description={card.description} link={card.link} />
        ))}
      </div>

    <footer>
      <ChatbotButton/>
        <div className="pages">
          <button onClick={handlePrevPage} className='foot-button' disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} </span>
          <button onClick={handleNextPage} className='foot-button' disabled={currentPage === Math.ceil(allCards.length / cardsPerPage)}>
            Next
          </button>
        </div>
    </footer>
    </div>
  );
};

export default App;

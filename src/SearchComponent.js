
import React, { useState } from 'react';
import './SearchComponent.css'

const SearchComponent = ({ onSearch }) => {
  const [tags, setTags] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(tags, query);
  };

  return (<>
    <div className='tagqueryStyle'>
      <div >
        Tags:
        <input className='input-val'
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas"
        />
        </div>
    <div >
        Search:
        <input className='input-val'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"/>
      </div>

      </div>
      <div className='search'>
      <button onClick={handleSearch} className='search-button'>Search</button>
    </div>
    </>
  );
};




export default SearchComponent;

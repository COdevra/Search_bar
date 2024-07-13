import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useDictionary from '../hooks/useDictionary';
import './SearchBar.css';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const {data, loading, error } = useDictionary(triggerSearch ? searchTerm : '');

  // console.log(data)

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setTriggerSearch(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-container">
        <input 
          type="text" 
          // value={searchTerm} 
          // onChange={handleChange} 
          // onKeyDown={handleKeyDown}
          placeholder="Search here"
        />
        <span className="search-icon" onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      {/* {!loading && !error && data.length === 0 && triggerSearch && (
        <p>Sorry, no data found for the word "{searchTerm}".</p>
      )} */}

      <ul>
        {data?.map((result, index) => (
          <li key={index}>
            <h2>{result.word}</h2>
            {result.meanings.map((meaning, idx) => (
              <div key={idx}>
                {meaning.definitions.map((definition, i) => (
                  <p key={i}>{definition.definition}</p>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

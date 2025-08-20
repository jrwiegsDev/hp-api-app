import React, { useState, useEffect, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import './CharacterList.css';

const houses = ["All", "Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

function CharacterList() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        setAllCharacters(data); 
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
      setIsLoading(false);
    };
    fetchCharacters();
  }, []);

  const filteredCharacters = useMemo(() => {
    return allCharacters
      .filter(character => {
        if (activeFilter === 'All') return true;
        return character.house === activeFilter;
      })
      .filter(character => {
        return character.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [allCharacters, activeFilter, searchTerm]);

  const openModal = (character) => setSelectedCharacter(character);
  const closeModal = () => setSelectedCharacter(null);
  const handleClear = () => {
    setSearchTerm('');
    setActiveFilter('All');
  };

  return (
    <div>
      <h1>Harry Potter Characters</h1>
      <div className="filters-container">
        <div className="search-container">
          <button className="filter-btn" onClick={handleClear}>Clear</button>
          <input
            type="text"
            placeholder="Search for a character..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          {houses.map(house => (
            <button
              key={house}
              className={`filter-btn ${activeFilter === house ? 'active' : ''}`}
              onClick={() => setActiveFilter(house)}
            >
              {house}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Summoning all characters...</p>
      ) : (
        <div className="character-grid">
          {filteredCharacters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              onCardClick={() => openModal(character)}
            />
          ))}
        </div>
      )}

      <CharacterModal 
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onRequestClose={closeModal}
      />
    </div>
  );
}

export default CharacterList;
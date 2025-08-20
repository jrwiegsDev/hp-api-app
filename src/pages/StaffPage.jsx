import React, { useState, useMemo } from 'react';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import { useCharacters } from '../hooks/useCharacters';
import '../components/CharacterList.css';

function StaffPage() {
  const { characters: allStaff, isLoading } = useCharacters('/staff');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = useMemo(() => {
    return allStaff.filter(staff =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStaff, searchTerm]);

  const openModal = (character) => setSelectedCharacter(character);
  const closeModal = () => setSelectedCharacter(null);
  const handleClear = () => setSearchTerm('');

  return (
    <div>
      <h1>Hogwarts Staff</h1>
      <div className="filters-container">
        <div className="search-container">
          <button className="filter-btn" onClick={handleClear}>Clear</button>
          <input
            type="text"
            placeholder="Search for a staff member..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Summoning all staff...</p>
      ) : (
        <div className="character-grid">
          {filteredStaff.map((character) => (
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

export default StaffPage;
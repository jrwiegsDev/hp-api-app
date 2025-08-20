import React, { useState, useMemo } from 'react';
import CharacterCard from '../components/CharacterCard';
import CharacterModal from '../components/CharacterModal';
import { useCharacters } from '../hooks/useCharacters';
import '../components/CharacterList.css';

function StudentsPage() {
  const { characters: allStudents, isLoading } = useCharacters('/students');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStudents, searchTerm]);

  const openModal = (character) => setSelectedCharacter(character);
  const closeModal = () => setSelectedCharacter(null);
  const handleClear = () => setSearchTerm('');

  return (
    <div>
      <h1>Hogwarts Students</h1>
      <div className="filters-container">
        <div className="search-container">
          <button className="filter-btn" onClick={handleClear}>Clear</button>
          <input
            type="text"
            placeholder="Search for a student..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Summoning all students...</p>
      ) : (
        <div className="character-grid">
          {filteredStudents.map((character) => (
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

export default StudentsPage;
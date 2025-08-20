import React, { useState, useEffect, useMemo } from 'react';
import './SpellsPage.css';

function SpellsPage() {
  const [allSpells, setAllSpells] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetch('https://hp-api.onrender.com/api/spells');
        const data = await response.json();
        setAllSpells(data);
      } catch (error) {
        console.error("Failed to fetch spells:", error);
      }
      setIsLoading(false);
    };

    fetchSpells();
  }, []);

  const filteredSpells = useMemo(() => {
    return allSpells.filter(spell => 
      spell.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allSpells, searchTerm]);

  // Function to clear the search bar
  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="spells-list">
      <h1>Book of Spells</h1>

      <div className="filters-container">
        <div className="search-container">
          <button className="filter-btn" onClick={handleClear}>Clear</button>
          <input
            type="text"
            placeholder="Search for a spell..."
            className="search-bar"
            value={searchTerm} // Control the input
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Summoning all spells...</p>
      ) : (
        filteredSpells.map((spell) => (
          <div key={spell.id} className="spell-item">
            <h3>{spell.name}</h3>
            <p>{spell.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default SpellsPage;
import React from 'react';
import './CharacterCard.css';

function CharacterCard({ character, onCardClick }) {
  // The new API uses character.image and character.name directly
  const imageUrl = character.image || 'https://placehold.co/250x300/1e1e1e/e0e0e0?text=No+Image';

  return (
    <div className="character-card" onClick={onCardClick}>
      <img src={imageUrl} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
}

export default CharacterCard;
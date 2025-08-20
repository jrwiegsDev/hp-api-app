import React from 'react';
import Modal from 'react-modal';
import './CharacterModal.css';

Modal.setAppElement('#root');

function CharacterModal({ character, isOpen, onRequestClose }) {
  if (!character) return null;

  // Destructure all the new properties we want to use
  const { 
    name, image, house, dateOfBirth, species, patronus, wand, 
    ancestry, actor, alive, gender, eyeColour, hairColour 
  } = character;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="character-modal"
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300}
    >
      <button onClick={onRequestClose} className="modal-close-btn">&times;</button>
      <div className="character-detail-header">
        <img 
          src={image || 'https://placehold.co/150x200/1e1e1e/e0e0e0?text=No+Image'} 
          alt={name}
          className="character-detail-image"
        />
        <div className="character-detail-info">
          <h2>{name}</h2>
          <p>{species || 'Species unknown'}</p>
          {/* Add a status indicator for whether the character is alive */}
          <p style={{ color: alive ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
            {alive ? 'Alive' : 'Deceased'}
          </p>
        </div>
      </div>
      <div className="character-attributes">
        <div className="attribute-item"><strong>House:</strong> {house || 'N/A'}</div>
        <div className="attribute-item"><strong>Born:</strong> {dateOfBirth || 'N/A'}</div>
        <div className="attribute-item"><strong>Ancestry:</strong> {ancestry || 'N/A'}</div>
        <div className="attribute-item"><strong>Patronus:</strong> {patronus || 'N/A'}</div>
        <div className="attribute-item">
          <strong>Wand:</strong> 
          {wand?.wood && wand?.core ? `${wand.wood}, ${wand.core}, ${wand.length || ''}"` : 'N/A'}
        </div>
        <div className="attribute-item"><strong>Actor:</strong> {actor || 'N/A'}</div>
      </div>
    </Modal>
  );
}

export default CharacterModal;
import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

const GameList = ({ roms, onSelectGame, onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>SELECT CARTRIDGE</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        {roms.map(game => (
          <div
            key={game.id}
            className="card"
            onClick={() => onSelectGame(game.file)}
            style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{
              height: '240px',
              overflow: 'hidden',
              background: '#000',
              position: 'relative'
            }}>
              <img
                src={game.cover}
                alt={game.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1rem', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: 0, color: 'var(--color-text)' }}>{game.title}</h3>
            </div>
          </div>
        ))}

        {/* Upload Card */}
        <div
          className="card"
          onClick={() => fileInputRef.current.click()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            border: '2px dashed var(--color-text-muted)'
          }}
        >
          <div style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>
            <FaPlus />
          </div>
          <p style={{ marginTop: '1rem' }}>Upload .NES File</p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".nes"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default GameList;

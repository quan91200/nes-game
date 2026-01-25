import React, { useState, useEffect } from 'react';

const ACTIONS = [
  { label: 'UP', code: 4 },
  { label: 'DOWN', code: 5 },
  { label: 'LEFT', code: 6 },
  { label: 'RIGHT', code: 7 },
  { label: 'A', code: 0 },
  { label: 'B', code: 1 },
  { label: 'Select', code: 2 },
  { label: 'Start', code: 3 },
];

const SettingsModal = ({ isOpen, onClose, volume, onVolumeChange, keyMap, onRemap, onReset }) => {
  const [listeningFor, setListeningFor] = useState(null); // Key currently being mapped (original key currently holding the action)

  useEffect(() => {
    if (!listeningFor) return;

    const handleKeyDown = (e) => {
      e.preventDefault();
      // Remap: listeningFor is the OLD key (that held the action), e.key is the NEW key
      onRemap(listeningFor, e.key);
      setListeningFor(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [listeningFor, onRemap]);

  if (!isOpen) return null;

  // Helper to find key for an action code
  const findKeyForAction = (code) => {
    // keyMap structure: { 'z': [1, 0], 'ArrowUp': [1, 4] }
    // We look for value[1] === code (assuming Player 1 always)
    for (const [key, val] of Object.entries(keyMap)) {
      if (val[0] === 1 && val[1] === code) return key;
    }
    return '---';
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} onClick={onClose}>
      <div className="modal card" style={{ padding: '2rem', width: '500px', maxWidth: '90%' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>SYSTEM SETTINGS</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </h2>

        {/* Audio Settings */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>AUDIO</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--color-primary)' }}
            />
            <span style={{ width: '30px', textAlign: 'right' }}>{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Control Settings */}
        <div>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--color-cta)', marginBottom: '1rem' }}>CONTROLS (CLICK TO REMAP)</h3>

          {listeningFor && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.5rem',
              background: 'var(--color-cta)',
              color: 'white',
              textAlign: 'center',
              borderRadius: '4px',
              animation: 'pulse 1s infinite'
            }}>
              Press any key using...
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.9rem' }}>
            {ACTIONS.map(action => {
              const currentKey = findKeyForAction(action.code);
              const isRemapping = listeningFor === currentKey;

              return (
                <React.Fragment key={action.label}>
                  <div style={{ color: '#888', display: 'flex', alignItems: 'center' }}>{action.label}</div>
                  <div style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => setListeningFor(currentKey)}
                      className="btn-secondary"
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.8rem',
                        minWidth: '100px',
                        background: isRemapping ? 'var(--color-cta)' : 'transparent',
                        color: isRemapping ? 'white' : 'var(--color-secondary)',
                        borderColor: isRemapping ? 'var(--color-cta)' : 'var(--color-secondary)'
                      }}
                    >
                      {currentKey === ' ' ? 'Space' : currentKey}
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            className="btn-secondary"
            onClick={onReset}
            style={{ flex: 1, borderColor: '#666', color: '#888' }}
          >
            RESTORE DEFAULTS
          </button>

          <button
            className="btn-primary"
            onClick={onClose}
            style={{ flex: 2 }}
          >
            CLOSE & SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

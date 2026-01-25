import React from 'react';

// JSNES Controller Mapping
const BUTTONS = {
  A: 0,
  B: 1,
  SELECT: 2,
  START: 3,
  UP: 4,
  DOWN: 5,
  LEFT: 6,
  RIGHT: 7
};

const GameController = ({ onButtonDown, onButtonUp }) => {

  const handleStart = (btn) => (e) => {
    e.preventDefault();
    onButtonDown(1, BUTTONS[btn]); // Player 1
  };

  const handleEnd = (btn) => (e) => {
    e.preventDefault();
    onButtonUp(1, BUTTONS[btn]);
  };

  const DPadBtn = ({ direction, style }) => (
    <button
      className="btn-dpad"
      onMouseDown={handleStart(direction)}
      onMouseUp={handleEnd(direction)}
      onTouchStart={handleStart(direction)}
      onTouchEnd={handleEnd(direction)}
      style={{
        width: '40px',
        height: '40px',
        position: 'absolute',
        background: '#333',
        border: '1px solid #555',
        borderRadius: '4px',
        ...style
      }}
    >
      <div style={{ fontSize: '20px', color: '#7C3AED' }}>
        {direction === 'UP' && '▲'}
        {direction === 'DOWN' && '▼'}
        {direction === 'LEFT' && '◀'}
        {direction === 'RIGHT' && '▶'}
      </div>
    </button>
  );

  const ActionBtn = ({ label, name }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <button
        onMouseDown={handleStart(name)}
        onMouseUp={handleEnd(name)}
        onTouchStart={handleStart(name)}
        onTouchEnd={handleEnd(name)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.2)', // Rose low opacity
          border: '2px solid #F43F5E',
          color: 'white',
          fontFamily: 'var(--font-heading)',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)'
        }}
      >
        {label}
      </button>
      <span style={{ fontSize: '10px', color: '#94A3B8' }}>{label}</span>
    </div>
  );

  return (
    <div className="controller" style={{
      marginTop: '2rem',
      padding: '2rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      {/* D-PAD Area */}
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <div style={{ position: 'absolute', top: '40px', left: '0', width: '120px', height: '40px', background: '#222', borderRadius: '4px' }}></div>
        <div style={{ position: 'absolute', top: '0', left: '40px', width: '40px', height: '120px', background: '#222', borderRadius: '4px' }}></div>
        <DPadBtn direction="UP" style={{ top: 0, left: '40px', borderRadius: '4px 4px 0 0' }} />
        <DPadBtn direction="DOWN" style={{ bottom: 0, left: '40px', borderRadius: '0 0 4px 4px' }} />
        <DPadBtn direction="LEFT" style={{ top: '40px', left: 0, borderRadius: '4px 0 0 4px' }} />
        <DPadBtn direction="RIGHT" style={{ top: '40px', right: 0, borderRadius: '0 4px 4px 0' }} />
      </div>

      {/* Select/Start Area */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '4rem' }}>
        <div style={{ textAlign: 'center' }}>
          <button
            onMouseDown={handleStart('SELECT')} onMouseUp={handleEnd('SELECT')}
            style={{ width: '40px', height: '12px', background: '#999', borderRadius: '4px', border: 'none', transform: 'rotate(-45deg)', cursor: 'pointer' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '10px' }}>SELECT</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onMouseDown={handleStart('START')} onMouseUp={handleEnd('START')}
            style={{ width: '40px', height: '12px', background: '#999', borderRadius: '4px', border: 'none', transform: 'rotate(-45deg)', cursor: 'pointer' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '10px' }}>START</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <ActionBtn label="B" name="B" />
        <ActionBtn label="A" name="A" />
      </div>
    </div>
  );
};

export default GameController;

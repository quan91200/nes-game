import React, { forwardRef } from 'react';

const EmulatorScreen = forwardRef((props, ref) => {
  return (
    <div className="emulator-screen-container" style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '256/240',
      maxWidth: '768px',
      margin: '0 auto',
      background: '#000',
      boxShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '2px solid rgba(255,255,255,0.1)'
    }}>
      {/* CRT Scanline Effect Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        pointerEvents: 'none',
        zIndex: 10
      }}></div>

      <canvas
        ref={ref}
        width={256}
        height={240}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated', // Crucial for retro look
          display: 'block'
        }}
      />
    </div>
  );
});

EmulatorScreen.displayName = 'EmulatorScreen';

export default EmulatorScreen;

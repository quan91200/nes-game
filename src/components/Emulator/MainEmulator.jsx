import React, { forwardRef } from 'react';
import EmulatorScreen from './EmulatorScreen';

const MainEmulator = forwardRef(({ isPlaying }, ref) => {
  // Always render to keep ref alive, just hide with CSS
  return (
    <div style={{
      width: '100%',
      display: isPlaying ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <EmulatorScreen ref={ref} />
      {/* Future: Add LED status lights or core info here */}
    </div>
  );
});

MainEmulator.displayName = 'MainEmulator';

export default MainEmulator;

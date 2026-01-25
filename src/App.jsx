import React, { useState, useEffect } from 'react';
import { useNes } from './hooks/useNes';
import SettingsModal from './components/UI/SettingsModal';
import Header from './components/Layout/Header';
import GameList from './components/UI/GameList';
import MainEmulator from './components/Emulator/MainEmulator';

function App() {
  const {
    canvasRef, loadRom, isPlaying, stop,
    volume, setVolume, toggleFullscreen, keymap, remapKey, resetKeys
  } = useNes();

  const [roms, setRoms] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load Game List
  useEffect(() => {
    fetch('/roms.json')
      .then(res => res.json())
      .then(data => setRoms(data))
      .catch(err => console.error('Failed to load ROM list:', err));
  }, []);

  // Handlers
  const handleLoadGame = async (fileName) => {
    try {
      const response = await fetch(`/roms/${fileName}`);
      const arrayBuffer = await response.arrayBuffer();
      loadRom(arrayBuffer);
    } catch (error) {
      console.error('Error loading game:', error);
      alert('Failed to load game cartridge.');
    }
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result;
      loadRom(buffer);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="app" style={{ minHeight: '100vh', padding: '2rem' }}>

      <Header
        isPlaying={isPlaying}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onFullscreen={toggleFullscreen}
        onEject={stop}
      />

      <div className="container" style={{ maxWidth: isPlaying ? '800px' : '1200px' }}>

        {/* Emulator View */}
        <MainEmulator
          ref={canvasRef}
          isPlaying={isPlaying}
        />

        {/* Game Selection View */}
        {!isPlaying && (
          <GameList
            roms={roms}
            onSelectGame={handleLoadGame}
            onUpload={handleUpload}
          />
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        volume={volume}
        onVolumeChange={setVolume}
        keyMap={keymap}
        onRemap={remapKey}
        onReset={resetKeys}
      />
    </div>
  );
}

export default App;

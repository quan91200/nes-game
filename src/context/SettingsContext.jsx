import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SettingsContext = createContext();

const STORAGE_KEY_VOLUME = 'nes_emu_volume';
const STORAGE_KEY_KEYMAP = 'nes_emu_keymap';

const DEFAULT_KEYS = {
  'ArrowUp': [1, 4],
  'ArrowDown': [1, 5],
  'ArrowLeft': [1, 6],
  'ArrowRight': [1, 7],
  'z': [1, 0], // A
  'x': [1, 1], // B
  'Enter': [1, 3], // Start
  'Shift': [1, 2]  // Select
};

export const SettingsProvider = ({ children }) => {
  // Volume State (Load from LocalStorage or default 0.5)
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_VOLUME);
    return saved !== null ? parseFloat(saved) : 0.5;
  });

  // Keymap State (Load from LocalStorage or default)
  const [keymap, setKeymap] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_KEYMAP);
    return saved ? JSON.parse(saved) : DEFAULT_KEYS;
  });

  // Persist Volume
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VOLUME, volume);
  }, [volume]);

  // Persist Keymap
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KEYMAP, JSON.stringify(keymap));
  }, [keymap]);

  const remapKey = useCallback((currentKey, newKey) => {
    setKeymap(prev => {
      const newMap = { ...prev };
      const action = newMap[currentKey];

      if (!action) return prev;

      if (newMap[newKey]) {
        delete newMap[newKey];
      }

      delete newMap[currentKey];
      newMap[newKey] = action;

      return newMap;
    });
  }, []);

  const resetKeys = useCallback(() => {
    setKeymap(DEFAULT_KEYS);
  }, []);

  return (
    <SettingsContext.Provider value={{
      volume,
      setVolume,
      keymap,
      remapKey,
      resetKeys
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

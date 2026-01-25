import { useRef, useEffect, useState, useCallback } from 'react';
import { NesCore } from '../core/NesCore';
import { useSettings } from '../context/SettingsContext';

const NES_WIDTH = 256;
const NES_HEIGHT = 240;

export const useNes = () => {
  const nesRef = useRef(null);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Consume Context
  const { volume, setVolume, keymap, remapKey, resetKeys } = useSettings();

  // State
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize NES Function
  const initNes = useCallback(() => {
    // Canvas Context
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(NES_WIDTH, NES_HEIGHT);
    const buf = new ArrayBuffer(imageData.data.length);
    const buf8 = new Uint8ClampedArray(buf);
    const buf32 = new Uint32Array(buf);

    // Initialize Core
    nesRef.current = new NesCore({
      onFrame: (buffer) => {
        let i = 0;
        for (let y = 0; y < NES_HEIGHT; ++y) {
          for (let x = 0; x < NES_WIDTH; ++x) {
            i = y * 256 + x;
            buf32[i] = 0xFF000000 | buffer[i]; // Full Alpha
          }
        }
        imageData.data.set(buf8);
        ctx.putImageData(imageData, 0, 0);
      },
      onAudioSample: (left, right) => {
        // Basic Audio logic placeholder
      }
    });
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Game Loop
  const start = useCallback(() => {
    if (!nesRef.current) initNes();
    setIsPlaying(true);

    const loop = () => {
      nesRef.current.frame();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    loop();
  }, [initNes]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // Load Rom logic
  const loadRom = useCallback((arrayBuffer) => {
    if (!nesRef.current) initNes();

    const uint8 = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < uint8.length; i++) {
      binary += String.fromCharCode(uint8[i]);
    }

    nesRef.current.loadROM(binary);
    start();
  }, [initNes, start]);

  // Handle Controls
  const buttonDown = (player, btn) => nesRef.current?.buttonDown(player, btn);
  const buttonUp = (player, btn) => nesRef.current?.buttonUp(player, btn);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default browser actions for game keys
      if (keymap[e.key]) {
        e.preventDefault();
      }

      if (!isPlaying) return;

      if (keymap[e.key]) {
        nesRef.current?.buttonDown(keymap[e.key][0], keymap[e.key][1]);
      }
    };

    const handleKeyUp = (e) => {
      if (keymap[e.key]) e.preventDefault();

      if (!isPlaying) return;

      if (keymap[e.key]) {
        nesRef.current?.buttonUp(keymap[e.key][0], keymap[e.key][1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, keymap]);

  useEffect(() => {
    initNes();
    return () => stop();
  }, [initNes, stop]);

  return {
    canvasRef,
    loadRom,
    isPlaying,
    stop,
    start,
    buttonDown,
    buttonUp,
    volume,
    setVolume,
    toggleFullscreen,
    keymap,
    remapKey,
    resetKeys
  };
};

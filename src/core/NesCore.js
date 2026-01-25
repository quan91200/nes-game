import { NES } from 'jsnes';

/**
 * NesCore - Wrapper class for JSNES
 * Handles the interaction between the React frontend and the NES emulator logic.
 */
export class NesCore {
  constructor(actions) {
    this.actions = actions; // callbacks for visual/audio

    this.nes = new NES({
      onFrame: (buffer) => {
        if (this.actions.onFrame) {
          this.actions.onFrame(buffer);
        }
      },
      onAudioSample: (left, right) => {
        if (this.actions.onAudioSample) {
          this.actions.onAudioSample(left, right);
        }
      },
      sampleRate: 44100, // Standard web audio sample rate
    });
  }

  /**
   * Load a ROM data into the emulator
   * @param {string} binaryString - The ROM data as a binary string
   */
  loadROM(binaryString) {
    try {
      this.nes.loadROM(binaryString);
      // ROM Loaded
    } catch (e) {
      console.error('Failed to load ROM:', e);
      throw e;
    }
  }

  /**
   * Run a single frame
   */
  frame() {
    this.nes.frame();
  }

  /**
   * Handle Controller Input
   * @param {number} player - 1 or 2
   * @param {number} button - Button ID from jsnes.Controller
   */
  buttonDown(player, button) {
    this.nes.buttonDown(player, button);
  }

  buttonUp(player, button) {
    this.nes.buttonUp(player, button);
  }

  getNES() {
    return this.nes;
  }

  reset() {
    this.nes.reset();
  }
}

# 🎮 NES Web Emulator

A professional, high-performance NES (Nintendo Entertainment System) emulator running directly in your browser. Built with modern web technologies and a Cyberpunk/Retro-Futurism aesthetic.

![NES Emulator](https://raw.githubusercontent.com/quan91200/nes-game/main/public/screenshot.png) 
*(Note: You can add a screenshot here later)*

## ✨ Features

- **Core Emulation**: Powered by `jsnes` for accurate and fast 8-bit emulation.
- **Save State Persistence**: Settings (Volume, Key Mapping) are saved automatically to LocalStorage.
- **Custom Key Bindings**: Fully customizable keyboard controls with an intuitive remapping UI.
- **Audio Control**: Dynamic volume adjustment with GainNode integration.
- **Visual Effects**:
  - CRT Scanline Overlay for authentic retro feel.
  - Neon/Cyberpunk UI aesthetics.
  - Pixel-perfect rendering using Canvas API.
- **Game Library**: 
  - Dynamic ROM loading from JSON configuration.
  - Drag-and-drop support for local `.nes` files.
- **Responsive Design**: Mobile-friendly controls (Touch D-Pad) and adaptive layout.

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (Variables, Flexbox/Grid) with no external CSS framework dependencies.
- **Emulator Core**: `jsnes` (wrapper adapter included).
- **Icons**: `react-icons` (FontAwesome).
- **State Management**: React Context API + LocalStorage.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/quan91200/nes-game.git
   cd nes-game
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open `http://localhost:5173` to play!

## 🎮 Controls (Default)

| Action | Player 1 Key |
|--------|--------------|
| **Up** | Arrow Up |
| **Down** | Arrow Down |
| **Left** | Arrow Left |
| **Right** | Arrow Right |
| **A** | Z |
| **B** | X |
| **Start** | Enter |
| **Select** | Shift |

*You can remap these keys in the **Settings** menu.*

## 📂 Project Structure

```
nes-game/
├── public/
│   ├── roms/          # NES ROM files
│   └── roms.json      # Game library metadata
├── src/
│   ├── assets/        # Images, Logos
│   ├── components/    
│   │   ├── Emulator/  # Core Emulator UI (Screen, Wrapper)
│   │   ├── Layout/    # Header, Shell
│   │   └── UI/        # GameList, Modals, Buttons
│   ├── context/       # SettingsContext (Global State)
│   ├── core/          # NesCore (JSNES Adapter)
│   ├── hooks/         # useNes (Game Loop, Audio, Input Hook)
│   ├── styles/        # Global CSS & Variables
│   └── App.jsx        # Main Entry Wrapper
└── README.md
```

## 📜 License

This project is open-source and available under the MIT License.

## 👨‍💻 Author

**Quan (quan91200)** - *Lead Developer*

---

*Note: This emulator is for educational purposes. Please use only with ROMs you legally own.*

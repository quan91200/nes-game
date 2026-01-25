import React from 'react';
import { FaCog, FaExpand, FaEject, FaGithub } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Header = ({ isPlaying, onSettingsClick, onFullscreen, onEject }) => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
        <h1 className="text-neon" style={{ margin: 0, fontSize: '1.5rem' }}>NES EMULATOR</h1>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          className="btn-primary"
          onClick={onSettingsClick}
          style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-primary)' }}
        >
          <FaCog /> SETTINGS
        </button>

        <a
          href="https://github.com/quan91200/nes-game"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'var(--color-primary)' }}
        >
          <FaGithub /> STAR
        </a>

        {isPlaying && (
          <button
            className="btn-secondary"
            onClick={onFullscreen}
            style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaExpand /> FULL
          </button>
        )}

        {isPlaying && (
          <button
            className="btn-secondary"
            onClick={onEject}
            style={{ padding: '8px 16px', fontSize: '0.8rem', color: '#F43F5E', borderColor: '#F43F5E', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaEject /> EJECT
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import logo from '../assets/logo.svg';
import styles from './MediaHeader.module.css';
import AlphaInfo from './AlphaInfo';


const MediaHeader: React.FC = () => {
  return (
      <div>
          <AlphaInfo />
    <header className={styles.header}>
            <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
    </header>
          </div>
  );
};

export default MediaHeader;
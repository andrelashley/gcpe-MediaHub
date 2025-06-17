import React from 'react';
import logo from '../assets/logo.svg';
import styles from './OrganizationsHeader.module.css';

const OrganzationsHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
    </header>
  );
};

export default OrganzationsHeader;
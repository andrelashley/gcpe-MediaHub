import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './OrganizationsLayout.module.css';
import LeftNav from './LeftNav';
import Header from './OrganizationsHeader';

const OrganizationsLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <LeftNav />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrganizationsLayout;
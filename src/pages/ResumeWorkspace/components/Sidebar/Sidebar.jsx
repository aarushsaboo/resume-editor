import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import SecondSidebar from '../SecondSidebar/SecondSidebar.jsx';

const Sidebar = () => {
  const [isSecondSidebarVisible, setIsSecondSidebarVisible] = useState(false);

  const toggleSecondSidebar = () => {
    setIsSecondSidebarVisible((prev) => !prev);
  };
  return (
    <>
    <div className={styles.sidebar}>
      <button className={styles.sidebarButton}>🏠</button>
      <button className={styles.sidebarButton} onClick={toggleSecondSidebar}>
          ☰
        </button>
      {/* <button className={styles.sidebarButton}>+</button>
      <button className={styles.sidebarButton}>📄</button>
      
      <button className={styles.sidebarButton}>👤</button>
      <button className={styles.sidebarButton}>🔨</button>
      
      <button className={styles.sidebarButton}>👥</button>
      <button className={styles.sidebarButton}>🗑️</button>
      <button className={styles.sidebarButton}>📈</button>
      <button className={styles.sidebarButton}>💼</button>
      <button className={styles.sidebarButton}>💡</button>
      <button className={styles.sidebarButton}>❓</button>
      <button className={styles.sidebarButton}>⚙️</button>
      <button className={styles.sidebarButton}>💬</button>
      <button className={styles.sidebarButton}>📋</button> */}
    </div>
       {isSecondSidebarVisible && <SecondSidebar />}
       </>
  );
};

export default Sidebar;
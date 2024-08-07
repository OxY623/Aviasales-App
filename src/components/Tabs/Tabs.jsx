import React from 'react'

import styles from './Tabs.module.scss'

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs

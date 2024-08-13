import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveTab } from '../../store/actions/tabsActions'

import styles from './Tabs.module.scss'

const Tabs = () => {
  const { tabs, activeTab } = useSelector((state) => state.tabs)
  const dispatch = useDispatch()

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab))
  }

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs

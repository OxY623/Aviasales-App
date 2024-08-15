import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSort } from '../../store/actions/ticketsActions'
//import { SET_ACTIVE_TAB_SORTING } from '../../store/actions/actionTypes'
import { setActiveTabSorting } from '../../store/actions/tabsActions'

import styles from './Tabs.module.scss'

const Tabs = () => {
  const { tabs, activeTab } = useSelector((state) => state.tabs)
  const dispatch = useDispatch()

  const handleTabClick = (tab) => {
    //dispatch({ type: SET_ACTIVE_TAB_SORTING, payload: tab.name })
    dispatch(setActiveTabSorting(tab.name))
    dispatch(setSort(tab.name))
  }

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.name ? styles.active : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs

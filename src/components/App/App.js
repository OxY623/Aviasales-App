import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FlightCard from '../FlightCard'
import Filter from '../Filter'
import Tabs from '../Tabs'
import Header from '../Header'
import { FlightContext } from '../../context/FlightContext'
import { setSort } from '../../store/actions/sortActions'
import { toggleFilter } from '../../store/actions/filtersActions'

import styles from './App.module.scss'

const App = () => {
  const { flights } = useContext(FlightContext)
  const filterOptions = useSelector((state) => state.filters) // Стучимся и достаем к фильтры данных
  const tabs = useSelector((state) => state.tabs.tabs) // Достаем вкладки
  const activeTab = useSelector((state) => state.tabs.activeTab) // Достаем активную вкладку
  const dispatch = useDispatch() // Диспетчер

  const handleFilterChange = (value) => {
    // dispatch({ type: 'TOGGLE_FILTER', payload: value })
    dispatch(toggleFilter(value)) // Вызываем диспетчер для изменения фильтра
  }

  const handleTabClick = (tab) => {
    dispatch(setSort(tab))
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <Filter options={filterOptions} onChange={handleFilterChange} />
        <div className={styles.wrapper}>
          <Tabs
            tabs={tabs} // Передаем вкладки в Tabs
            activeTab={activeTab} // Передаем активную вкладку в Tabs
            onTabClick={handleTabClick}
          />
          <div className={styles.flightList}>
            {flights.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))}
          </div>
          <button
            className={styles.buttonShowMore}
            onClick={() => {
              window.alert('Работает!')
            }}
          >
            Показать еще 5 билетов!
          </button>
        </div>
      </main>
    </div>
  )
}

export default App

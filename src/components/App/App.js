import React, { useState } from 'react'

import FlightCard from '../FlightCard/FlightCard'
import Filter from '../Filter/Filter'
import Tabs from '../Tabs/Tabs'
import Header from '../Header/Header'

import styles from './App.module.scss'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [flights, setFlights] = useState([
    {
      price: '13 400',
      from: 'MOW',
      to: 'NKT',
      duration: '21ч 15м',
      transfers: '2 пересадки',
      airlines: 'S7 Airlines',
    },
    {
      price: '13 400',
      from: 'MOW',
      to: 'NKT',
      duration: '21ч 15м',
      transfers: '2 пересадки',
      airlines: 'S7 Airlines',
    },
    {
      price: '13 400',
      from: 'MOW',
      to: 'NKT',
      duration: '21ч 15м',
      transfers: '2 пересадки',
      airlines: 'S7 Airlines',
    },
    {
      price: '13 400',
      from: 'MOW',
      to: 'NKT',
      duration: '21ч 15м',
      transfers: '2 пересадки',
      airlines: 'S7 Airlines',
    },
    {
      price: '13 400',
      from: 'MOW',
      to: 'NKT',
      duration: '21ч 15м',
      transfers: '2 пересадки',
      airlines: 'S7 Airlines',
    },
  ])

  const [filterOptions, setFilterOptions] = useState([
    { value: 'all', label: 'Все', checked: false },
    { value: 'direct', label: 'Без пересадок', checked: true },
    { value: 'one', label: '1 пересадка', checked: true },
    { value: 'two', label: '2 пересадки', checked: true },
    { value: 'three', label: '3 пересадки', checked: false },
  ])

  const [activeTab, setActiveTab] = useState('Самый дешевый')

  const handleFilterChange = (value) => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === value
          ? { ...option, checked: !option.checked }
          : option,
      ),
    )
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <Filter options={filterOptions} onChange={handleFilterChange} />
        <div className={styles.wrapper}>
          <Tabs
            tabs={['Самый дешевый', 'Самый быстрый', 'Оптимальный']}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />
          <div className={styles.flightList}>
            {flights.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FlightCard from '../FlightCard'
import Filter from '../Filter'
import Tabs from '../Tabs'
import Header from '../Header'
import Spinner from '../Spinner'
import NoTickets from '../NoTickets'
import Error from '../Error'
import {
  fetchTickets,
  loadMoreTickets,
} from '../../store/actions/ticketsActions'

import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()

  // Получение данных из хранилища Redux
  const { tickets, loading, error, displayedTicketsCount } = useSelector(
    (state) => state.tickets,
  )
  const tabs = useSelector((state) => state.tabs.tabs)
  const activeTab = useSelector((state) => state.tabs.activeTab)

  // Вызываем экшен для загрузки билетов при монтировании компонента
  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  // Обработчик для кнопки "Показать еще"
  const handleShowMore = () => {
    //dispatch({ type: 'LOAD_MORE_TICKETS' })
    dispatch(loadMoreTickets)
  }

  // Обрезаем количество отображаемых билетов
  const displayedTickets = tickets.slice(0, displayedTicketsCount)

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.mainContent}>
        <Filter />
        <div className={styles.wrapper}>
          <Tabs tabs={tabs} activeTab={activeTab} />
          <div className={styles.flightList}>
            {/* Выводим спиннер, ошибку или список билетов */}
            {loading && <Spinner />}
            {error && <Error message={'Ошибка загрузки билетов'} />}
            {tickets.length === 0 && !error ? (
              <NoTickets />
            ) : (
              displayedTickets.map((flight, index) => (
                <FlightCard key={index} {...flight} />
              ))
            )}
          </div>
          {/* Кнопка для загрузки +5 билетов */}
          {tickets.length > displayedTicketsCount && (
            <button className={styles.buttonShowMore} onClick={handleShowMore}>
              Показать еще 5 билетов
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

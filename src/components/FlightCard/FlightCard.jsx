import React from 'react'

import CarrierImage from '../CarrierImage/CarrierImage'

import styles from './FlightCard.module.scss'

function formatTimeStr(dateStr, duration) {
  // Создаем объект Date из строки
  const departureDate = new Date(dateStr)

  // Извлекаем часы и минуты времени отправления
  const departureHours = departureDate.getUTCHours()
  const departureMinutes = departureDate.getUTCMinutes()

  // Создаем новый объект Date для времени прибытия
  const arrivalDate = new Date(departureDate.getTime() + duration * 60000) // Продолжительность в миллисекундах

  // Извлекаем часы и минуты времени прибытия
  const arrivalHours = arrivalDate.getUTCHours()
  const arrivalMinutes = arrivalDate.getUTCMinutes()

  // Форматируем строки времени
  const departureTime = `${departureHours.toString().padStart(2, '0')}:${departureMinutes.toString().padStart(2, '0')}`
  const arrivalTime = `${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes.toString().padStart(2, '0')}`

  return `${departureTime} - ${arrivalTime}`
}

function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м`
}

function formatTitle(number) {
  return number === 1 ? 'пересадка' : `${number} пересадки`
}

function formatParagraf(arr) {
  return arr.join(', ')
}

const FlightCard = ({ price = 99, carrier = 'DP', segments = [] }) => {
  let listSchedule = segments.map((segment) => {
    return (
      <div key={segment.id} className={styles.schedule}>
        <div className={styles.departure}>
          <h3
            className={styles.title}
          >{`${segment.origin} - ${segment.destination}`}</h3>
          <p>{formatTimeStr(segment.date, segment.duration)}</p>
        </div>
        <div className={styles.duration}>
          <h3 className={styles.title}>В пути</h3>
          <p>{formatTime(segment.duration)}</p>
        </div>
        <div className={styles.transfers}>
          <h3 className={styles.title}>{formatTitle(segment.stops.length)}</h3>
          <p>{formatParagraf(segment.stops)}</p>
        </div>
      </div>
    )
  })

  return (
    <div className={styles.flightCard}>
      <div className={styles.header}>
        <div className={styles.price}>{price} Р</div>
        <div className={styles.carrier}>
          <CarrierImage carrier={carrier} />
        </div>
      </div>
      <div className={styles.details}>{listSchedule}</div>
    </div>
  )
}

export default FlightCard

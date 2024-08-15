import React from 'react'

import CarrierImage from '../CarrierImage'

import {
  formatTime,
  formatParagraf,
  formatTimeStr,
  formatTitle,
} from './format'
import styles from './FlightCard.module.scss'

const FlightCard = ({ price = 99, carrier = 'DP', segments = [] }) => {
  let listSchedule = segments.map((segment, index) => {
    return (
      <div key={index} className={styles.schedule}>
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

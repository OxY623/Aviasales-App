import React from 'react'

import styles from './FlightCard.module.scss'

const FlightCard = ({
  price = 99,
  from = 'Minsk',
  to = 'Moskva',
  duration,
  transfers,
  airlines,
}) => {
  return (
    <div className={styles.flightCard}>
      <div className={styles.price}>{price} Р</div>
      <div className={styles.details}>
        <div className={styles.route}>
          <span>{from}</span>
          <span>{to}</span>
        </div>
        <div className={styles.duration}>{duration}</div>
        <div className={styles.transfers}>{transfers}</div>
        <div className={styles.airlines}>{airlines}</div>
      </div>
    </div>
  )
}

export default FlightCard

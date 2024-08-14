import React from 'react'

import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <span className={styles.animation}></span>
      <span className={styles.info}>Загрузка...</span>
    </div>
  )
}

export default Spinner

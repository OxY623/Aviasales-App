import React from 'react'

import styles from './Header.module.scss'
import img_logo from './Logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logotype}>
        <img src={img_logo} alt="logo" />
        <span style={{ visibility: 'hidden', display: 'none' }}>
          Flight Search
        </span>
      </div>
    </header>
  )
}

export default Header

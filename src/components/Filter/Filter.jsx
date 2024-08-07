import React from 'react'

import styles from './Filter.module.scss'

const Filter = ({ options, onChange }) => {
  return (
    <div className={styles.filter}>
      <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      {options.map((option) => (
        <label key={option.value} className={styles.option}>
          <input
            type="checkbox"
            className={option.checked ? 'checked' : ''}
            checked={option.checked}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}

export default Filter

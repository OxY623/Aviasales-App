import React from 'react'

import styles from './CarrierImage.module.scss'

const CarrierImage = ({ carrier }) => {
  const imageUrl = `https://pics.avs.io/99/36/${carrier}.png`

  return (
    <div className={styles.carrier}>
      <img src={imageUrl} alt={carrier} />
    </div>
  )
}

export default CarrierImage

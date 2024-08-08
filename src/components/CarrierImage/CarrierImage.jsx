import React from 'react'

import styles from './CarrierImage.module.scss' // Обратите внимание, что имя файла стилей нужно заменить на ваше

const CarrierImage = ({ carrier }) => {
  // Формируем URL для изображения
  const imageUrl = `https://pics.avs.io/99/36/${carrier}.png`

  return (
    <div className={styles.carrier}>
      <img src={imageUrl} alt={carrier} />
    </div>
  )
}

export default CarrierImage

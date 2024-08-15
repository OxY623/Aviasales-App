import styles from './NoTickets.module.scss'
const NoTickets = () => {
  return (
    <div className={styles.content}>
      <h2 className={styles.content__title}>Нет доступных билетов</h2>
      <p className={styles.content__description}>
        Рейсов, подходящих под заданные фильтры, не найдено.
      </p>
      <p className={styles.content__description}>
        Пожалуйста, измените условия поиска и попробуйте снова.
      </p>
    </div>
  )
}

export default NoTickets

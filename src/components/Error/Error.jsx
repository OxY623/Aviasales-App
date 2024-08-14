import styles from './Error.module.scss'

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  )
}

export default Error

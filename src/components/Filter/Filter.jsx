// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
//
// import styles from './Filter.module.scss'
//
// const Filter = () => {
//   const filters = useSelector((state) => state.filters)
//   const dispatch = useDispatch()
//
//   const handleFilterChange = (value) => {
//     dispatch({ type: 'TOGGLE_FILTER', payload: value })
//   }
//
//   return (
//     <div className={styles.filter}>
//       <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
//       {Object.keys(filters).map((key) => (
//         <label key={key} className={styles.option}>
//           <input
//             type="checkbox"
//             checked={filters[key].checked}
//             onChange={() => handleFilterChange(key)}
//           />
//           {filters[key].label}
//         </label>
//       ))}
//     </div>
//   )
// }
//
// export default Filter
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TOGGLE_FILTER } from '../../store/actions/actionTypes'

import styles from './Filter.module.scss'

const Filter = () => {
  const filters = useSelector((state) => state.tickets.filters)
  const dispatch = useDispatch()

  const handleFilterChange = (key) => {
    dispatch({ type: TOGGLE_FILTER, payload: key })
  }

  return (
    <div className={styles.filter}>
      <h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      {Object.keys(filters).map((key) => (
        <label key={key} className={styles.option}>
          <input
            type="checkbox"
            checked={filters[key].checked}
            onChange={() => handleFilterChange(key)}
          />
          {filters[key].label}
        </label>
      ))}
    </div>
  )
}

export default Filter

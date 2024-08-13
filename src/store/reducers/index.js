import { combineReducers } from 'redux'

import tabsReducer from './tabsReducer'
import filtersReducer from './filtersReducer'
import sortReducer from './sortReducer'

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  tabs: tabsReducer,
  filters: filtersReducer,
  sort: sortReducer,
})

export default rootReducer

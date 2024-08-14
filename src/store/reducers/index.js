import { combineReducers } from 'redux'

import tabsReducer from './tabsReducer'
import ticketsReducer from './ticketsReducer'

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  tabs: tabsReducer,
  tickets: ticketsReducer,
})

export default rootReducer

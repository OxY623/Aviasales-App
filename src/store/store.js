import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

import rootReducer from './reducers'

// Middleware для логирования
// const loggerMiddleware = (store) => (next) => (action) => {
//   const result = next(action)
//   console.log(
//     'Middleware',
//
//     store.getState(),
//   )
//   return result
// }

// Определение middleware
// const middleware = [loggerMiddleware]

// Создание Redux хранилища с middleware и DevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
  // applyMiddleware(...middleware)
)

export default store

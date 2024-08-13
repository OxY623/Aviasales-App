import { createStore, applyMiddleware } from 'redux'
// eslint-disable-next-line import/default
import { thunk } from 'redux-thunk'

// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  console.log('Middleware', store.getState())
  return result
}
// Определение middleware, если необходимо
const middleware = [loggerMiddleware, thunk] // Добавьте необходимые middleware сюда

// Создание Redux store с middleware и DevTools
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
  // composeWithDevTools(applyMiddleware(...middleware)),
)

export default store

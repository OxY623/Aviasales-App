import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './store/store'
import App from './components/App'
import FlightProvider from './context/FlightContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FlightProvider>
        <App />
      </FlightProvider>
    </Provider>
  </React.StrictMode>,
)

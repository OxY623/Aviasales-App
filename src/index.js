import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App/App'
import FlightProvider from './Context/FlightContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FlightProvider>
      <App />
    </FlightProvider>
  </React.StrictMode>,
)

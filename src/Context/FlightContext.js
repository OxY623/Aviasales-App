import React, { useState, createContext } from 'react'

// Создаем контекст
const FlightContext = createContext()

// Создаем провайдер
const FlightProvider = ({ children }) => {
  const [flights] = useState([
    {
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: ['DXB', 'JNB'],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: ['DOH', 'HKG', 'JNB'],
        },
      ],
    },
    {
      price: 19950,
      carrier: 'DP',
      segments: [
        {
          origin: 'MOW',
          destination: 'HKT',
          date: '2024-07-07T19:23:37.881Z',
          duration: 1214,
          stops: ['DXB', 'JNB'],
        },
        {
          origin: 'HKT',
          destination: 'MOW',
          date: '2024-10-03T10:37:28.129Z',
          duration: 1425,
          stops: ['DOH', 'HKG', 'JNB'],
        },
      ],
    },
  ])

  const value = { flights }

  return (
    <FlightContext.Provider value={value}>{children}</FlightContext.Provider>
  )
}

export { FlightContext }

export default FlightProvider

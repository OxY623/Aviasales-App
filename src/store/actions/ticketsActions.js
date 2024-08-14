import axios from 'axios'

import {
  SET_SORT,
  FETCH_TICKETS_FAILURE, // Тип действия при ошибке получения билетов
  FETCH_TICKETS_REQUEST, // Тип действия при начале запроса билетов
  FETCH_TICKETS_SUCCESS, // Тип действия при успешном получении билетов
} from './actionTypes'

// Действие для начала запроса билетов
export const setSort = (typeSort) => ({
  type: SET_SORT,
  payload: typeSort, // Тип сортировки
})

export const fetchTicketsRequest = () => ({
  type: FETCH_TICKETS_REQUEST,
})

// Действие при успешном получении билетов
export const fetchTicketsSuccess = (data) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: data, // Сюда передаются данные, полученные из запроса
})

export const fetchTicketsFailure = (error) => ({
  type: FETCH_TICKETS_FAILURE,
  payload: error,
})

// Функция для получения searchId
const getSearchId = async () => {
  try {
    const response = await axios.get(
      'https://aviasales-test-api.kata.academy/search',
    )
    return response.data.searchId
  } catch (error) {
    console.error('Failed to fetch searchId:', error)
    throw error
  }
}

// Thunk action creator для получения билетов
export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(fetchTicketsRequest())

    try {
      const searchId = await getSearchId()

      let allTickets = []
      let stop = false
      let attempts = 0
      const maxAttempts = 5

      while (!stop && attempts < maxAttempts) {
        try {
          const response = await axios.get(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
          )

          allTickets = [...allTickets, ...response.data.tickets]
          stop = response.data.stop

          // Если данные полностью получены, прерываем цикл
          if (stop) {
            break
          }
        } catch (error) {
          if (error.response && error.response.status === 500) {
            attempts += 1
            if (attempts >= maxAttempts) {
              throw new Error('Exceeded maximum retry attempts')
            }
            // Задержка перед повторной попыткой
            await new Promise((resolve) => setTimeout(resolve, 1000))
          } else {
            throw error
          }
        }
      }

      dispatch(fetchTicketsSuccess(allTickets))
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message))
    }
  }
}

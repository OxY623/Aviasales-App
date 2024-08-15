import axios from 'axios'

import {
  SET_SORT,
  FETCH_TICKETS_FAILURE,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_PARTIAL_SUCCESS,
  LOAD_MORE_TICKETS,
  TOGGLE_FILTER,
} from './actionTypes'

export const loadMoreTickets = () => ({ type: LOAD_MORE_TICKETS })

export const toogleFilter = (key) => ({ type: TOGGLE_FILTER, payload: key })

// Действие для начала запроса билетов
export const setSort = (typeSort) => ({
  type: SET_SORT,
  payload: typeSort,
})

export const fetchTicketsRequest = () => ({
  type: FETCH_TICKETS_REQUEST,
})

// Действие при успешном получении всех билетов
export const fetchTicketsSuccess = (data) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: data,
})

// Действие при частичном успешном получении билетов
export const fetchTicketsPartialSuccess = (data) => ({
  type: FETCH_TICKETS_PARTIAL_SUCCESS,
  payload: data,
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
    //console.error('Failed to fetch searchId:', error)
    throw new Error('Failed to fetch searchId')
  }
}

// Экспоненциальная задержка для повторных попыток
const exponentialDelay = (attempts) => {
  const delay = Math.pow(2, attempts) * 1000
  return new Promise((resolve) => setTimeout(resolve, delay))
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
      const maxAttempts = 10

      while (!stop && attempts < maxAttempts) {
        try {
          const response = await axios.get(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
          )

          const tickets = response.data.tickets
          allTickets = [...allTickets, ...tickets]

          // Отправляем частично загруженные билеты в стор
          dispatch(fetchTicketsPartialSuccess(allTickets))

          stop = response.data.stop

          if (stop) {
            break
          }
        } catch (error) {
          if (error.response && error.response.status === 500) {
            attempts += 1
            if (attempts >= maxAttempts) {
              throw new Error(
                'Превышено количество попыток повторной загрузки данных. Пожалуйста, попробуйте позже.',
              )
            }
            await exponentialDelay(attempts)
          } else {
            dispatch(fetchTicketsFailure(`Ошибка запроса: ${error.message}`))
            return
          }
        }
      }

      // Когда все данные загружены, отправляем полный список
      dispatch(fetchTicketsSuccess(allTickets))
    } catch (error) {
      dispatch(fetchTicketsFailure(`Ошибка загрузки данных: ${error.message}`))
    }
  }
}

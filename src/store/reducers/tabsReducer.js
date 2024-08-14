import { SET_ACTIVE_TAB_SORTING } from '../actions/actionTypes'

const TAB_OPTIONS = {
  CHEAPEST: 'Самый дешевый',
  FASTEST: 'Самый быстрый',
  OPTIMAL: 'Оптимальный',
}

const initialState = {
  tabs: [
    { id: 1, name: 'cheapest', label: TAB_OPTIONS.CHEAPEST },
    { id: 2, name: 'fastest', label: TAB_OPTIONS.FASTEST },
    { id: 3, name: 'optimal', label: TAB_OPTIONS.OPTIMAL },
  ],
  activeTab: 'cheapest', // Начальная активная вкладка
}

// Редьюсер для обработки состояния вкладок
const tabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB_SORTING:
      return {
        ...state,
        activeTab: action.payload, // Обновляем активную вкладку
      }
    default:
      return state
  }
}

export default tabsReducer

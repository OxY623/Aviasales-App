import { SET_ACTIVE_TAB } from '../actions/actionTypes'

const initialState = {
  tabs: ['Самый дешевый', 'Самый быстрый', 'Оптимальный'],
  activeTab: 'Самый дешевый', // Начальная активная вкладка
}

// Редьюсер для обработки состояния вкладок
const tabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload, // Обновляем активную вкладку
      }
    default:
      return state
  }
}

export default tabsReducer

import { SET_ACTIVE_TAB } from '../actions/actionTypes'

const TAB_OPTIONS = {
  CHEAPEST: 'Самый дешевый',
  FASTEST: 'Самый быстрый',
  OPTIMAL: 'Оптимальный',
}

// const initialState = {
//   tabs: ['Самый дешевый', 'Самый быстрый', 'Оптимальный'],
//   activeTab: 'Самый дешевый', // Начальная активная вкладка
// }

const initialState = {
  tabs: [TAB_OPTIONS.CHEAPEST, TAB_OPTIONS.FASTEST, TAB_OPTIONS.OPTIMAL],
  activeTab: TAB_OPTIONS.CHEAPEST,
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

import { SET_ACTIVE_TAB } from './actionTypes'

// Действие для установки активной вкладки
export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab, // Передаем название вкладки
})

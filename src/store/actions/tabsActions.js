import { SET_ACTIVE_TAB, SET_ACTIVE_TAB_SORTING } from './actionTypes'

// Действие для установки активной вкладки
export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
})

export const setActiveTabSorting = (tab) => ({
  type: SET_ACTIVE_TAB_SORTING,
  payload: tab,
})

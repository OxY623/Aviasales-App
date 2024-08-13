import { SET_SORT } from './actionTypes'

// Действие для установки типа сортировки
export const setSort = (sortType) => ({
  type: SET_SORT,
  payload: sortType, // Передаем тип сортировки
})

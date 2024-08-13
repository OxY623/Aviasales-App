import { TOGGLE_FILTER } from './actionTypes'

export const toggleFilter = (filterName) => {
  return {
    type: TOGGLE_FILTER,
    payload: filterName,
  }
}

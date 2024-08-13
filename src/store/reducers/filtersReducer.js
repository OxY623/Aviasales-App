import { TOGGLE_FILTER } from '../actions/actionTypes'

const initialState = {
  all: { label: 'Все', checked: false },
  direct: { label: 'Без пересадок', checked: false },
  one: { label: '1 пересадка', checked: false },
  two: { label: '2 пересадки', checked: false },
  three: { label: '3 пересадки', checked: false },
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const { payload: filterKey } = action

      // Если переключается "all", обновляем все фильтры
      if (filterKey === 'all') {
        const newCheckedStatus = !state.all.checked
        const newState = {}
        Object.keys(state).forEach((key) => {
          newState[key] = { ...state[key], checked: newCheckedStatus }
        })
        return newState
      }

      // Переключение выбранного фильтра
      const updatedState = {
        ...state,
        [filterKey]: {
          ...state[filterKey],
          checked: !state[filterKey].checked,
        },
      }

      // Проверка, выбраны ли все фильтры кроме "all"
      const allSelected = Object.keys(updatedState).every(
        (key) => key === 'all' || updatedState[key].checked,
      )

      return {
        ...updatedState,
        all: { ...updatedState.all, checked: allSelected },
      }
    }
    default:
      return state
  }
}

export default filtersReducer

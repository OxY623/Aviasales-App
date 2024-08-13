import { SET_SORT } from '../actions/actionTypes'

const initialState = 'Самый дешевый'

// Редьюсер для обработки типа сортировки
const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT:
      return action.payload // Обновляем тип сортировки
    default:
      return state
  }
}

export default sortReducer

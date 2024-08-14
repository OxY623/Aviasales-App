import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_FAILURE,
  SET_SORT, // Убедитесь, что SET_SORT правильно импортирован
} from '../actions/actionTypes'

const initialState = {
  allTickets: [], // Хранение исходного списка билетов
  tickets: [],
  loading: false,
  error: null,
  offset: 5,
  displayedTicketsCount: 5,
  sort: 'cheapest', // Состояние сортировки
  filters: {
    all: { label: 'Все', checked: true },
    direct: { label: 'Без пересадок', checked: true },
    one: { label: '1 пересадка', checked: true },
    two: { label: '2 пересадки', checked: true },
    three: { label: '3 пересадки', checked: true },
  },
}

// Фильтрация билетов
const filterTickets = (tickets, filters) => {
  return tickets.filter((ticket) => {
    // Проверка, если выбран фильтр "Все"
    if (filters.all.checked) return true

    // Проверка на количество пересадок для каждого сегмента
    const stopsCount = Math.max(
      ticket.segments[0].stops.length,
      ticket.segments[1].stops.length,
    )

    if (filters.direct.checked && stopsCount === 0) return true
    if (filters.one.checked && stopsCount === 1) return true
    if (filters.two.checked && stopsCount === 2) return true
    return filters.three.checked && stopsCount === 3
  })
}

// Сортировка билетов
const sortTickets = (tickets, sortType) => {
  switch (sortType) {
    case 'cheapest':
      return [...tickets].sort((a, b) => a.price - b.price)
    case 'fastest':
      return [...tickets].sort(
        (a, b) =>
          Math.min(a.segments[0].duration, a.segments[1].duration) -
          Math.min(b.segments[0].duration, b.segments[1].duration),
      )
    case 'optimal':
      return [...tickets].sort(
        (a, b) =>
          a.price / Math.min(a.segments[0].duration, a.segments[1].duration) -
          b.price / Math.min(b.segments[0].duration, b.segments[1].duration),
      )
    default:
      return tickets
  }
}

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return { ...state, loading: true, error: null }
    case 'FETCH_TICKETS_SUCCESS': {
      const allTickets = action.payload
      const filteredTickets = filterTickets(allTickets, state.filters)
      return {
        ...state,
        loading: false,
        allTickets, // Сохраняем исходные билеты
        tickets: sortTickets(filteredTickets, state.sort),
      }
    }
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case 'LOAD_MORE_TICKETS':
      return {
        ...state,
        displayedTicketsCount: state.displayedTicketsCount + state.offset,
      }
    case SET_SORT: {
      const sortedTickets = sortTickets(
        filterTickets(state.allTickets, state.filters),
        action.payload,
      )
      return {
        ...state,
        sort: action.payload,
        tickets: sortedTickets,
      }
    }
    case 'TOGGLE_FILTER': {
      const { payload: filterKey } = action

      // Новое состояние фильтров
      let newFilters = {
        ...state.filters,
        [filterKey]: {
          ...state.filters[filterKey],
          checked: !state.filters[filterKey].checked,
        },
      }

      // Обработка ситуации с галочкой "Все"
      if (filterKey === 'all') {
        // Если выбрана галочка "Все", устанавливаем/снимаем все остальные
        const allChecked = newFilters.all.checked
        Object.keys(newFilters).forEach((key) => {
          newFilters[key].checked = allChecked
        })
      } else {
        // Если снимается любая другая галочка, проверяем галочку "Все"
        const allSelected = Object.keys(newFilters)
          .filter((key) => key !== 'all')
          .every((key) => newFilters[key].checked)

        // Обновляем галочку "Все"
        newFilters.all.checked = allSelected
      }

      // Фильтруем и сортируем билеты с учетом новых фильтров
      const filteredAndSortedTickets = sortTickets(
        filterTickets(state.allTickets, newFilters),
        state.sort,
      )

      return {
        ...state,
        filters: newFilters,
        tickets: filteredAndSortedTickets,
      }
    }
    default:
      return state
  }
}

export default ticketsReducer

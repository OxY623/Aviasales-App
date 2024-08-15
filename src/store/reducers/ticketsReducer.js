import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_FAILURE,
  SET_SORT,
  FETCH_TICKETS_PARTIAL_SUCCESS,
  FETCH_TICKETS_SUCCESS,
  LOAD_MORE_TICKETS,
  TOGGLE_FILTER,
} from '../actions/actionTypes'

// Начальное состояние для редуктора
const initialState = {
  allTickets: [], // Все билеты, полученные от сервера
  tickets: [], // Отфильтрованные и отсортированные билеты, отображаемые в UI
  loading: false, // Статус загрузки данных
  error: null, // Сообщение об ошибке, если запросы не удались
  offset: 5, // Количество билетов, которые подгружаются при нажатии "загрузить больше"
  displayedTicketsCount: 5, // Количество отображаемых билетов
  sort: 'cheapest', // Тип сортировки Tabs
  filters: {
    all: { label: 'Все', checked: true },
    direct: { label: 'Без пересадок', checked: true },
    one: { label: '1 пересадка', checked: true },
    two: { label: '2 пересадки', checked: true },
    three: { label: '3 пересадки', checked: true },
  },
}

// Функция для фильтрации билетов на основе выбранных фильтров
const filterTickets = (tickets, filters) => {
  return tickets.filter((ticket) => {
    // Если выбран фильтр "Все", возвращаем все билеты
    if (filters.all.checked) return true

    // Определяем количество пересадок в билете
    const stopsCount = Math.max(
      ticket.segments[0].stops.length,
      ticket.segments[1].stops.length,
    )

    // Проверяем, соответствует ли билет выбранным фильтрам
    if (filters.direct.checked && stopsCount === 0) return true
    if (filters.one.checked && stopsCount === 1) return true
    if (filters.two.checked && stopsCount === 2) return true
    return filters.three.checked && stopsCount === 3
  })
}

// Функция для сортировки билетов в зависимости от типа сортировки
const sortTickets = (tickets, sortType) => {
  let durationItem = (item) =>
    Math.min(item.segments[0].duration, item.segments[1].duration)
  switch (sortType) {
    case 'cheapest':
      // Сортировка по цене (от дешевых к дорогим)
      return [...tickets].sort((a, b) => a.price - b.price)
    case 'fastest':
      // Сортировка по длительности
      return [...tickets].sort((a, b) => durationItem(a) - durationItem(b))
    case 'optimal':
      // Сортировка по оптимальности (цена / минимальная длительность)
      return [...tickets].sort(
        (a, b) => a.price / durationItem(a) - b.price / durationItem(b),
      )
    default:
      // Если тип сортировки не указан, возвращаем билеты без изменений
      return tickets
  }
}

// Редуктор для обработки действий, связанных с билетами
const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      // Начало загрузки билетов
      return { ...state, loading: true, error: null }

    case FETCH_TICKETS_PARTIAL_SUCCESS: {
      // Получены частичные данные билетов
      const updatedAllTickets = [...state.allTickets, ...action.payload]
      const filteredTickets = filterTickets(updatedAllTickets, state.filters)
      return {
        ...state,
        allTickets: updatedAllTickets,
        tickets: sortTickets(filteredTickets, state.sort),
      }
    }

    case FETCH_TICKETS_SUCCESS: {
      // Получены все билеты
      const allTickets = action.payload
      const filteredTickets = filterTickets(allTickets, state.filters)
      return {
        ...state,
        loading: false, // Полная загрузка завершена
        allTickets,
        tickets: sortTickets(filteredTickets, state.sort),
      }
    }

    case FETCH_TICKETS_FAILURE:
      // Ошибка загрузки билетов
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case LOAD_MORE_TICKETS:
      // Увеличение количества отображаемых билетов при нажатии "Загрузить больше"
      return {
        ...state,
        displayedTicketsCount: state.displayedTicketsCount + state.offset,
      }

    case SET_SORT: {
      // Установка типа сортировки
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

    case TOGGLE_FILTER: {
      // Изменение состояния фильтра (включение/выключение)
      const { payload: filterKey } = action

      // Обновление состояния фильтра
      let newFilters = {
        ...state.filters,
        [filterKey]: {
          ...state.filters[filterKey],
          checked: !state.filters[filterKey].checked,
        },
      }

      // Если изменился фильтр "Все", обновляем состояние всех фильтров
      if (filterKey === 'all') {
        const allChecked = newFilters.all.checked
        Object.keys(newFilters).forEach((key) => {
          newFilters[key].checked = allChecked
        })
      } else {
        // Если изменился любой другой фильтр, обновляем состояние фильтра "Все"
        const allSelected = Object.keys(newFilters)
          .filter((key) => key !== 'all')
          .every((key) => newFilters[key].checked)

        newFilters.all.checked = allSelected
      }

      // Фильтрация и сортировка билетов с новыми фильтрами
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
      // Возвращаем текущее состояние, если действие не распознано
      return state
  }
}

export default ticketsReducer

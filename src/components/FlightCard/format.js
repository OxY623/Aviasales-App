export function formatTimeStr(dateStr, duration) {
  // Создаем объект Date из строки
  const departureDate = new Date(dateStr)

  // Извлекаем часы и минуты времени отправления
  const departureHours = departureDate.getUTCHours()
  const departureMinutes = departureDate.getUTCMinutes()

  // Создаем новый объект Date для времени прибытия
  const arrivalDate = new Date(departureDate.getTime() + duration * 60000) // Продолжительность в миллисекундах

  // Извлекаем часы и минуты времени прибытия
  const arrivalHours = arrivalDate.getUTCHours()
  const arrivalMinutes = arrivalDate.getUTCMinutes()

  // Форматируем строки времени
  const departureTime = `${departureHours.toString().padStart(2, '0')}:${departureMinutes.toString().padStart(2, '0')}`
  const arrivalTime = `${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes.toString().padStart(2, '0')}`

  return `${departureTime} - ${arrivalTime}`
}

export function formatTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м`
}

export function formatTitle(number) {
  return number === 1 ? 'пересадка' : `${number} пересадки`
}

export function formatParagraf(arr) {
  return arr.join(', ')
}

const toSplitHour = (value: string): { hour: number; minutes: number } => {
  const [time, term] = value.toLocaleLowerCase().split(' ')
  const items = time.split(':').map(parseFloat)

  if (!time.startsWith('12') && term.includes('pm')) {
    items[0] += 12
  }

  return { hour: items[0], minutes: items[1] }
}

const toLocalTime = (time: Date | string, offset = 0): Date => {
  if (typeof time !== 'string') {
    return time as Date
  }

  const { hour, minutes } = toSplitHour(time)

  const date = new Date()
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    hour + offset,
    minutes,
    0
  )

  date.setTime(utc)

  return date
}

export const isBetweenTimes = (
  start: Date | string,
  finish: Date | string,
  date = new Date(),
  offset = 4
): boolean => {
  const startTime = toLocalTime(start, offset)
  const endTime = toLocalTime(finish, offset)

  return date > startTime && date < endTime
}

export const getCurrentUTC = (args?: string | number | Date) => {
  const date = args ? new Date(args) : new Date()
  const now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  return new Date(now_utc)
}

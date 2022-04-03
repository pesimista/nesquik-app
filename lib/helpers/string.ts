export const normalize = (value: string, textOnly = true): string => {
  const normal = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  if (textOnly) {
    return normal.replace(/[^\w\s]/gi, '')
  }

  return normal
}

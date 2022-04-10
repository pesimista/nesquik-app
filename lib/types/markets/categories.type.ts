export type CategoryObject<T> = {
  ids: string[]
  categoriesDescriptions: T[]
}

export type Category = {
  categoryID: string
  parent: string
  image?: string
  name: string
  affiliateID: string
}

export type MarketCategory = {
  marketID: string
  order: number
  name: string
  categoryID: string
  image: string
  schedule: string[]
  affiliateID: string
  banner?: string
  shape?: string
  parent?: string
}

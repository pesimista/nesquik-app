export interface HomeBanners {
  [key: string]: Banner[]
}

export interface Banner {
  bannerID: string
  image: string
  largeImage?: string
  largeImagesArray?: string[]
  type: 'lead' | 'category' | 'promo' | 'service'
  name: string
  priority: number
  isHidden: boolean
  url: string
  queryParams?: {
    [key: string]: string
  }
  disabled?: boolean
  caption?: string
  isDelivery?: boolean
  coordinates?: Coordinates
  radiusDistance?: number
  affiliateID?: string
  col?: string
  dateIn?: string
  dateOut?: string
  schedule?: string[]
  gender?: 'male' | 'female'
  ageRange?: string[]
  backgroundColor?: string
  exclusiveFor: 'mobile' | 'desktop' | 'both'
  gallery?: any[]
}

// export interface Banner {
//   bannerID?: string;
//   isHidden?: boolean;
//   caption?: string;
//   url: string;
//   image: string;
//   queryParams: {
//     market: string;
//     dialog: string;
//   };
// }

interface Coordinates {
  lat: number
  lng: number
  accuracy?: number
}

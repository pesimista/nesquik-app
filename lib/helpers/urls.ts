const baseURLs = {
  '/store/showcase/affiliates': '/stores',
}

export const parseURL = (url): string => {
  if (baseURLs[url]) {
    return baseURLs[url]
  }

  return url
}

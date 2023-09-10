export const toDollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format

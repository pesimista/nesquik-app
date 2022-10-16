const routerMock = {
  route: '/',
  pathname: '',
  query: 'storeid',
  asPath: '',
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
}

export default routerMock
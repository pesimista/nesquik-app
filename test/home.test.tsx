import { render, screen } from '@testing-library/react'
import StoreDetails from '@/pages/stores/[storeid]'
import routerMock from './mocks/router.mock'
import mock from './mocks/firebase.mock'

// import { firestore } from '@/lib/firebase'
// import { CollectionReference, DocumentData } from 'firebase/firestore'

// import { firestore } from '../lib/firebase'
// const firestore = new FirebaseMock()
jest.mock(
  '../lib/firebase',
  () => mock,
  // ({
  // ...jest.requireActual<object>('../lib/firebase'),
  // firestore: {
  //   doc: jest.fn(),
  // },
  //   collection: jest.fn(),
  // }),
  { virtual: false }
)
jest.mock('next/router', () => ({
  useRouter: () => routerMock,
}))

describe('Home', () => {
  beforeAll(() => {})

  it('renders a heading', () => {
    // let a: Partial<CollectionReference<DocumentData>>

    // const collection = jest.spyOn(firestore, 'collection').mockReturnValue({
    //   doc,
    // })

    render(<StoreDetails />)

    screen.getByRole('button')
  })
})

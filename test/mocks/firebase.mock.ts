class FirebaseMock {
  collection = jest.fn().mockReturnValue(() => {
    return {
      doc: this.doc,
    }
  })

  static instance = new FirebaseMock()

  doc = jest.fn()
}

const mock = { default: new FirebaseMock() }

export default mock

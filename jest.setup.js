import '@testing-library/jest-dom'
import nock from 'nock'

// Configure nock for HTTP mocking
beforeAll(() => {
  nock.disableNetConnect()
})

afterAll(() => {
  nock.enableNetConnect()
  nock.cleanAll()
})

afterEach(() => {
  nock.cleanAll()
}) 
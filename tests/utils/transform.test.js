const { transform } = require('../../src/utils/transform')
const { fetchDataFromDummyJson } = require('../../src/services/userService')
const { testcase1, testcase2, testcase3 } = require('../output/transform')
describe('grouping users by department works', () => {
  test('testcase with only user', async () => {
    const users = await fetchDataFromDummyJson()
    expect(transform(users.slice(0, 1))).toEqual(testcase1)
  })

  test('testcase with 2 users', async () => {
    const users = await fetchDataFromDummyJson()
    expect(transform(users.slice(0, 2))).toEqual(testcase2)
  })

  test('testcase with all users', async () => {
    const users = await fetchDataFromDummyJson()
    expect(transform(users)).toEqual(testcase3)
  })

  test('testcase empty array', async () => {
    const users = await fetchDataFromDummyJson()
    expect(transform([])).toEqual({})
  })
})

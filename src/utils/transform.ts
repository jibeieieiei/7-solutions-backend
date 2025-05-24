import { User, DepartmentSummary } from '../types/userTypes'
import lodash from 'lodash'

export function transform(users: User[]): Record<string, DepartmentSummary> {
  let result: Record<string, DepartmentSummary> = {}
  let groupedByDepartment = lodash.groupBy(
    users,
    (item) => item.company.department
  )
  for (var key in groupedByDepartment) {
    const user = groupedByDepartment[key]

    // male female
    const male = user.reduce((count, user) => {
      return user.gender === 'male' ? count + 1 : count
    }, 0)
    const female = user.reduce((count, user) => {
      return user.gender === 'female' ? count + 1 : count
    }, 0)

    // ageRange
    const minAge = user.reduce((min, user) => {
      return user.age < min ? user.age : min
    }, user[0].age)
    const maxAge = user.reduce((max, user) => {
      return user.age > max ? user.age : max
    }, user[0].age)
    const ageRange = `${minAge}-${maxAge}`

    // hair
    const hair = user.reduce((acc: Record<string, number>, user) => {
      const color = user.hair?.color ?? 'Unknown'
      acc[color] = (acc[color] || 0) + 1
      return acc
    }, {})

    // address
    const address = user.reduce((acc: Record<string, string>, user) => {
      const key = user.firstName + user.lastName
      acc[key] = user.address.postalCode
      return acc
    }, {})

    result[key] = {
      male: male,
      female: female,
      ageRange: ageRange,
      hair: hair,
      addressUser: address,
    }
  }
  return result
}

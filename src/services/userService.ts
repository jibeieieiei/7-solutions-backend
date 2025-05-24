import axios from 'axios'
import { User } from '../types/userTypes'

const API_URL = 'https://dummyjson.com/users'

export async function fetchDataFromDummyJson() {
  try {
    const response = await axios.get<{ users: User[] }>(API_URL)
    const users: User[] = response.data.users
    return users
  } catch (error) {
    console.error('Failed to fetch users', error)
    throw new Error('Failed to fetch or process user data')
  }
}

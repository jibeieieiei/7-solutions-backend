import express, { Request, Response } from 'express'
import { fetchDataFromDummyJson } from './services/userService'
import { User } from './types/userTypes'
import { transform } from './utils/transform'

const app = express()
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

app.get('/', async (_: Request, res: Response) => {
  try {
    const users: User[] = await fetchDataFromDummyJson()
    res.json(users)
  } catch (error) {
    res.status(500).send('Error fetching data from DummyJson')
  }
})

app.get('/transform', async (req: Request, res: Response) => {
  try {
    const users: User[] = await fetchDataFromDummyJson()
    const transformData = transform(users)
    res.json(transformData)
  } catch (error) {
    res.status(500).send('Error transform data')
  }
})

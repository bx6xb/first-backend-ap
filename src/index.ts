import express, { NextFunction, Request, Response } from 'express'
import { productsRouter } from './routes/productsRouter'

const app = express()
const port = 3000

app.use(express.json()) // to parse request body
app.use('/products', productsRouter)

// variables
let requestCount = 0

// Middlewares
const zenowMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.zenow = 'zenow'
  next() 
}
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.query.token === '123') {
    next() 
  } else {
    res.send(401)
  }
}
const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  requestCount++
  next()
}

// use middlewares
app.use(zenowMiddleware)
app.use(authGuardMiddleware)
app.use(requestCounterMiddleware)

// endpoints
app.get('/zenow', (req: Request, res: Response) => {
  // @ts-ignore
  const zenow = req.zenow
  res.send({value: zenow + '!' + ' count ' + requestCount})
})
app.get('/users', (req: Request, res: Response) => {
  // @ts-ignore
  const zenow = req.zenow
  res.send({value: zenow + ' from users!' + ' count ' + requestCount})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
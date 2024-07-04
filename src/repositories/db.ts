import { MongoClient } from "mongodb"

const yourConnectionURI = process.env.mongoURI || "mongodb://localhost:27017"

const client = new MongoClient(yourConnectionURI)
const db = client.db("shopt")
export const productsCollection = db.collection<Product>("products")

export const runDb = async () => {
  try {
    await client.connect()
    await client.db("products").command({ ping: 1 })
    console.log("Successfully connected to mongo server")
  } catch {
    console.log("Can't connect to db")
    await client.close()
  }
}

// types
export type Product = {
  id: number
  title: string
}

import { Product, productsCollection } from "./db"

export const productsRepository = {
  async getAllProducts() {
    return productsCollection.find({}).toArray()
  },
  async findProductByName(findTerm: string) {
    return productsCollection.find({ title: { $regex: findTerm } }).toArray()
  },
  async findProductById(id: number) {
    const product = await productsCollection.findOne({ id })
    if (product) {
      return product
    } else {
      return null
    }
  },
  async createProduct(title: string) {
    const newProduct = {
      id: +new Date(),
      title: title,
    } as Product

    await productsCollection.insertOne(newProduct)
    return newProduct // return new product
  },
  async updateProduct(id: number, title: string) {
    const result = await productsCollection.updateOne({ id }, { $set: { title } })
    return result.matchedCount === 1
  },
  async deleteProduct(id: number) {
    const result = await productsCollection.deleteOne({ id })
    return result.deletedCount === 1
  },
}

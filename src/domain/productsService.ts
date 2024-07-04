import { productsRepository } from "../repositories/productsDbRepository"

export const productsService = {
  async getAllProducts() {
    return await productsRepository.getAllProducts()
  },
  async findProductByName(findTerm: string) {
    return await productsRepository.findProductByName(findTerm)
  },
  async findProductById(id: number) {
    return await productsRepository.findProductById(id)
  },
  async createProduct(title: string) {
    return await productsRepository.createProduct(title)
  },
  async updateProduct(id: number, title: string) {
    return await productsRepository.updateProduct(id, title)
  },
  async deleteProduct(id: number) {
    return await productsRepository.deleteProduct(id)
  },
}

const products: Product[] = ["orange", "cheese", "tomato"].map((p, i) => ({ id: i + 1, title: p }))

export const productsRepository = {
  async getProducts() {
    return products
  },
  async findProductByName(findTerm: string) {
    return products.filter((p) => p.title.indexOf(findTerm) >= 0)
  },
  async findProductById(id: number) {
    return products.find((p) => p.id === id)
  },
  async createProduct(title: string) {
    const newProduct = {
      id: products.length + 1,
      title: title,
    } as Product
    products.push(newProduct)
    return newProduct // return new product
  },
  async updateProduct(id: number, title: string) {
    const product = products.find((p) => p.id === id)
    if (product) {
      product.title = title
      return true
    } else {
      return false
    }
  },
  async deleteProduct(id: number) {
    for (let i = 1; i <= products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
    return false
  },
}

// types
type Product = {
  id: number
  title: string
}

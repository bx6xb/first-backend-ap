import { NextFunction, Request, Response, Router } from "express"
import { productsService } from "../domain/productsService"
import { body } from "express-validator"
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware"

export const productsRouter = Router({})

// Variables
const notAllowedError = { error: "Not allowed" }

// Middlewares
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const encodedCredentials = authHeader.split(" ")[1]
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("utf-8")
    const [username, password] = decodedCredentials.split(":")

    if (username === "admin" && password === "qwerty") {
      next()
    } else {
      res.status(401).send(notAllowedError)
    }
  } else {
    res.status(401).send(notAllowedError)
  }
}

productsRouter.use(authMiddleware)

const titleValidation = body("title")
  .isLength({ min: 3, max: 10 })
  .withMessage("Title lenght should be from 3 to 10 symbols")

productsRouter.get("/", async (req: Request, res: Response) => {
  const allProducts = await productsService.getAllProducts()
  res.send(allProducts)
})
productsRouter.get("/:productTitle", inputValidationMiddleware, (req: Request, res: Response) => {
  const foundProducts = productsService.findProductByName(req.params.productTitle)
  if (foundProducts) {
    res.send(foundProducts)
  } else {
    res.send(404)
  }
})
productsRouter.get("/:id", inputValidationMiddleware, (req: Request, res: Response) => {
  const product = productsService.findProductById(+req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.sendStatus(404)
  }
})
productsRouter.post(
  "/",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    if (!req.body.title.trim()) {
      res.status(400).send({ message: "Bad request" })
    }
    const newProduct = await productsService.createProduct(req.body.title)
    res.status(201).send(newProduct)
  }
)
productsRouter.delete("/:id", inputValidationMiddleware, async (req: Request, res: Response) => {
  const isProductDeleted = await productsService.deleteProduct(+req.params.id)
  if (isProductDeleted) {
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})
productsRouter.put(
  "/:id",
  titleValidation,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const isProductUpdated = await productsService.updateProduct(+req.params.id, req.body.title)
    if (isProductUpdated) {
      const product = productsService.findProductById(+req.params.id)
      res.send(product)
    } else {
      res.sendStatus(404)
    }
  }
)

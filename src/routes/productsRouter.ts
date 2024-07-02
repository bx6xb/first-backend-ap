import { Request, Response, Router } from "express"
import { productsRepository } from "../repositories/productsRepository"
import { body } from 'express-validator'
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware"

export const productsRouter = Router({})

const titleValidation = body('title').isLength({min: 3, max: 10}).withMessage('Title lenght should be from 3 to 10 symbols')

productsRouter.get('/', (req: Request, res: Response) => {
    const allProducts = productsRepository.getProducts()
    res.send(allProducts)
})
productsRouter.get('/:productTitle',inputValidationMiddleware, (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProductByName(req.params.productTitle)
    if (foundProducts) {
        res.send(foundProducts)
    } else {
        res.send(404)
    }
})
productsRouter.get('/:id',inputValidationMiddleware, (req: Request, res: Response) => {
    const product = productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.post('/', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    if (!req.body.title.trim()) {
        res.status(400).send({message: 'Bad request'})
    }
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productsRouter.delete('/:id',inputValidationMiddleware, (req: Request, res: Response) => {
    const isProductDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isProductDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
productsRouter.put('/:id', titleValidation, inputValidationMiddleware, (req: Request, res: Response) => {
    const isProductUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isProductUpdated) {
        const product = productsRepository.findProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
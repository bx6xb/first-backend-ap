"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const productsRepository_1 = require("../repositories/productsRepository");
const express_validator_1 = require("express-validator");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
exports.productsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title').isLength({ min: 3, max: 10 }).withMessage('Title lenght should be from 3 to 10 symbols');
exports.productsRouter.get('/', (req, res) => {
    const allProducts = productsRepository_1.productsRepository.getProducts();
    res.send(allProducts);
});
exports.productsRouter.get('/:productTitle', inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const foundProducts = productsRepository_1.productsRepository.findProductByName(req.params.productTitle);
    if (foundProducts) {
        res.send(foundProducts);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.get('/:id', inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const product = productsRepository_1.productsRepository.findProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.post('/', titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    if (!req.body.title.trim()) {
        res.status(400).send({ message: 'Bad request' });
    }
    const newProduct = productsRepository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
exports.productsRouter.delete('/:id', inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const isProductDeleted = productsRepository_1.productsRepository.deleteProduct(+req.params.id);
    if (isProductDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.put('/:id', titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, (req, res) => {
    const isProductUpdated = productsRepository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isProductUpdated) {
        const product = productsRepository_1.productsRepository.findProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});

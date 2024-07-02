"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsRouter_1 = require("./routes/productsRouter");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // to parse request body
app.use('/products', productsRouter_1.productsRouter);
// variables
let requestCount = 0;
// Middlewares
const zenowMiddleware = (req, res, next) => {
    // @ts-ignore
    req.zenow = 'zenow';
    next();
};
const authGuardMiddleware = (req, res, next) => {
    // @ts-ignore
    if (req.query.token === '123') {
        next();
    }
    else {
        res.send(401);
    }
};
const requestCounterMiddleware = (req, res, next) => {
    requestCount++;
    next();
};
// use middlewares
app.use(zenowMiddleware);
app.use(authGuardMiddleware);
app.use(requestCounterMiddleware);
// endpoints
app.get('/zenow', (req, res) => {
    // @ts-ignore
    const zenow = req.zenow;
    res.send({ value: zenow + '!' + ' count ' + requestCount });
});
app.get('/users', (req, res) => {
    // @ts-ignore
    const zenow = req.zenow;
    res.send({ value: zenow + ' from users!' + ' count ' + requestCount });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

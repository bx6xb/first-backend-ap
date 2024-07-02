"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = void 0;
const products = ['orange', 'cheese', 'tomato'].map((p, i) => ({ id: i + 1, title: p }));
exports.productsRepository = {
    getProducts() {
        return products;
    },
    findProductByName(findTerm) {
        return products.filter(p => p.title.indexOf(findTerm) >= 0);
    },
    findProductById(id) {
        return products.find(p => p.id === id);
    },
    createProduct(title) {
        const newProduct = {
            id: products.length + 1,
            title: title
        };
        products.push(newProduct);
        return newProduct; // return new product
    },
    updateProduct(id, title) {
        const product = products.find(p => p.id === id);
        if (product) {
            product.title = title;
            return true;
        }
        else {
            return false;
        }
    },
    deleteProduct(id) {
        for (let i = 1; i <= products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};

const fs = require("fs")
const randomId = require('random-id');

class ProductManager {
    constructor(path) {
        this.path = path
    }

    addNewProduct = (title, description, price, thumbnail, code, stock) => {

        if(fs.existsSync(this.path)){
            //Existe el archivo
            const product = {
                id: parseInt(randomId(2, '100')),
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            }

            const contenido = fs.readFileSync(this.path, 'utf-8')
            const products = JSON.parse(contenido)

            products.push(product)

            fs.writeFileSync(this.path, JSON.stringify(products));

            console.log(products)
        }else{
            //Escribir archivo
            const products = [];

            fs.writeFileSync(this.path, JSON.stringify(products));
        }
    }

    updateProduct = (idProduct, title, description, price, thumbnail, code, stock) => {

        const contenido = fs.readFileSync(this.path, 'utf-8')
        const products = JSON.parse(contenido)

        const product = products.find((product) => {
            return product.id === idProduct
        })

        const newProducts = products.filter((products) => {
            return products.id != idProduct
        })

        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;

        newProducts.push(product)

        fs.writeFileSync(this.path, JSON.stringify(products));

        return newProducts
      
    }

    getAllProducts = () => {
        if(fs.existsSync(this.path)){
            const products =  fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(products)
        }else{
            return [];
        }
    }

    getProductById = (idProduct) => {
        if(fs.existsSync(this.path)){
            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(contenido)

            const product = products.find((product) => {
                return product.id == idProduct
            })

            if(product == null){
                return 'No se encontro el producto'
            }

            return product;

        }else{
            return "No se encontro el archivo";
        }
    }

    deleteProductById = (idProduct) => {
        if(fs.existsSync(this.path)){
            const contenido =  fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(contenido)

            const newProducts = products.filter((product) => {
                return product.id != idProduct
            })

            fs.writeFileSync(this.path, JSON.stringify(newProducts));

            return newProducts;

        }else{
            return "No se encontro el archivo";
        }
    }
}

module.exports = ProductManager;
const express = require('express')
const app = express()
const puerto = 3000

//Class ProductManager
const ProductManager = require ('./ProductManager')

app.get('/products', (req, res) => {

    const limit = req.query.limit

    const manager = new ProductManager('db.json')

    const allProducts = manager.getAllProducts();

    if(limit){
        const products = allProducts.slice(0, limit)

        return res.json({
            statusCode: 200,
            products: products
        }).status(200)
    }
  
    return res.json({
        statusCode: 200,
        products: allProducts
    }).status(200)
})

app.get('/products/:idProduct', (req, res) => {

    const idProduct = req.params.idProduct

    const manager = new ProductManager('db.json')

    const product = manager.getProductById(idProduct);
  
    return res.json({
        statusCode: 200,
        product
    }).status(200)
})

app.post('/addProduct', (req, res) => {

    const manager = new ProductManager('db.json')

    manager.addNewProduct('titulo1', 'descripcion1', 100.00, 'Imagenes', 'MX-1', 10 )

    return res.json({
        statusCode: 200,
        message: 'Producto Agregado'
    }).status(200)

})

app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto: ${puerto}`)
})
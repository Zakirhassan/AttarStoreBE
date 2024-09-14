const productService = require('../services/productService');
const ipinfo = require('ipinfo'); 

const addProduct = async (req, res) => {
    try {
        const result = await productService.addProduct(req.body, req.files);
        res.status(201).json({ message: 'Product added successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product' });
    }
};

const getProducts = async (req, res) => {
    try {
        const getCountryFromIP = (ip) => {
            return new Promise((resolve, reject) => {
              ipinfo(ip, (err, data) => {
                if (err) return reject(err);
                resolve(data.country);  // Example: 'IN' for India, 'US' for the USA
              });
            });
          };
        
          let c = await getCountryFromIP(req.ip)
        const category = req.query.category || '';
        const search = req.query.search || '';
        const products = await productService.getProducts(category, search, c);
        res.status(200).json({ data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productService.deleteProduct(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting product' });
    }
};

const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const files = req.files;

        const result = await productService.editProduct(productId, updatedProduct, files);
        res.status(200).json({ message: 'Product updated successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
    }
};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    editProduct
};

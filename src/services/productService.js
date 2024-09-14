const db = require('../config/database');


const addProduct = (productData, files) => {
    return new Promise((resolve, reject) => {
        console.log("Product Data:", productData);
        db.query('INSERT INTO products SET ?', productData, (err, result) => {
            if (err) return reject(err);

            const productId = result.insertId;
            if (files) {
                files.forEach((file) => {
                    const imageUrl = `/uploads/${file.filename}`;
                    db.query('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)', [productId, imageUrl], (err) => {
                        if (err) return reject(err);
                    });
                });
            }
            resolve(result);
        });
    });
};



const getProducts = (category, search, country) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT products.*, 
                   GROUP_CONCAT(product_images.image_url) AS images 
            FROM products
            LEFT JOIN product_images ON products.id = product_images.product_id
        `;
        
        const filters = [];
        const values = [];

        if (category) {
            filters.push(`products.category = ?`);
            values.push(category);
        }

        if (search) {
            filters.push(`(products.name LIKE ? OR products.description LIKE ?)`);
            values.push(`%${search}%`, `%${search}%`);
        }

        if (filters.length > 0) {
            query += ' WHERE ' + filters.join(' AND ');
        }

        query += ' GROUP BY products.id'; // Group by product ID to merge the images per product
        
        db.query(query, values, (err, results) => {
            if (err) return reject(err);

            // Parse image URLs as arrays
            const productsWithImages = results.map(product => ({
                ...product,
                images: product.images ? product.images.split(',') : [] // Split concatenated image URLs
            }));

            resolve(productsWithImages);
        });
    });
};


const deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE id = ?', productId, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const editProduct = (productId, productData, files) => {
    return new Promise((resolve, reject) => {
        // Update product details
        db.query('UPDATE products SET ? WHERE id = ?', [productData, productId], (err, result) => {
            if (err) return reject(err);

            // If there are new images, update them
            if (files && files.length > 0) {
                // First, delete old images for this product
                db.query('DELETE FROM product_images WHERE product_id = ?', productId, (err) => {
                    if (err) return reject(err);

                    // Then, add new images
                    files.forEach((file) => {
                        const imageUrl = `/uploads/${file.filename}`;
                        db.query('INSERT INTO product_images (product_id, image_url) VALUES (?, ?)', [productId, imageUrl], (err) => {
                            if (err) return reject(err);
                        });
                    });
                });
            }
            resolve(result);
        });
    });
};

module.exports = { addProduct, getProducts, deleteProduct, editProduct };

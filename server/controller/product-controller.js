import Product from '../model/product.schema.js';

export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        return response.status(200).json(products);
    } catch (error) {
        return response.status(500).json({ message: `Failed to fetch products: ${error.message}` });
    }
};

export const getProductById = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await Product.findOne({ id }); // Simplified query syntax
        if (!product) {
            return response.status(404).json({ message: `Product with id ${id} not found` });
        }
        return response.status(200).json(product);
    } catch (error) {
        return response.status(500).json({ message: `Failed to fetch product: ${error.message}` });
    }
};
import { products } from "./constants/data.js";
import Product from "./model/product.schema.js";

const DefaultData = async () => {
    try {
        // Check if any products already exist in the database
        const existingProducts = await Product.find({ id: { $in: products.map(p => p.id) } });

        // Filter out products that already exist
        const productsToInsert = products.filter(
            product => !existingProducts.some(existing => existing.id === product.id)
        );

        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
            console.log(`${productsToInsert.length} products inserted successfully`);
        } else {
            console.log("No new products to insert; all products already exist");
        }
    } catch (error) {
        console.log("error while inserting default data", error.message);
    }
};

export default DefaultData;
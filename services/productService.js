const Product = require('../models/product');
const { uploadImage, deleteImage } = require('../services/imageService');


exports.deleteProductService = async (productId) => {
    const product = await Product.findByIdAndDelete(productId).exec();

    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }

    for (const imageUrl of product.images) {
        await deleteImage(imageUrl);
    }

    return product;
};
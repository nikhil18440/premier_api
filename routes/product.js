import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js"
import Product from "../models/product.js"

import Router from 'express'
const router = Router()

//get product
router.get("/:id", async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all products
router.get("/",  async (req,res) => {
    const qNew = req.query.new
    console.log(qNew)
    try {
        let products

        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(3)
        }else{
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Route to fetch products matching categories
router.post('/categories', async (req, res) => {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ message: 'Invalid categories array' });
    }

    try {
        // Fetch products and calculate the number of matching categories
        const products = await Product.find({
            categories: { $in: categories }
        });

        // Sort products based on the number of matching categories
        const sortedProducts = products.sort((a, b) => {
            const aMatchCount = a.categories.filter(cat => categories.includes(cat)).length;
            const bMatchCount = b.categories.filter(cat => categories.includes(cat)).length;
            return bMatchCount - aMatchCount; // Sort in descending order
        });

        // Get the first 3 products
        const topProducts = sortedProducts.slice(0, 3);

        return res.json(topProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});




// create a post
router.post("/:id", verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product(req.body)

    try {
        
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    } catch (error) {
        res.status(400).json(error)
    }
})



export default router
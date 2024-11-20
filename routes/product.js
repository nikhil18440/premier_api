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

// create a post
router.post("/", verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product(req.body)

    try {
        
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    } catch (error) {
        res.status(400).json(error)
    }
})



export default router
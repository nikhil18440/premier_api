const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const Product = require("../models/product.js")

const router = require("express").Router()

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
    try {
        let products

        if (qNew) {
            products = await Product.find({
                ordered: {
                    $in : false
                }
            }).sort({createdAt: -1}).limit(3)
        }else{
            products = await Product.find()
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router
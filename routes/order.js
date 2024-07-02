const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")
const Order = require("../models/order.js")

const router = require("express").Router()


//create order
router.post("/:id", verifyTokenAndAuthorization, async (req,res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
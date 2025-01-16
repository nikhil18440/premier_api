import { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } from "./verifyToken.js"
import Order from "../models/order.js"

import Router from 'express'
const router = Router()


//create order
router.post("/", async (req,res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(400).json(error)
    }
})

//update order
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {  
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.body._id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(400).json(error)
    }
})

//get user orders
router.get("/find/:id", verifyTokenAndAuthorization, async (req,res) => {
    try {
        const order = await Order.find({userId: req.params.id})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get one order
router.get("/findOne/:id", verifyTokenAndAuthorization, async (req,res) => {
    try {
        const order = await Order.findOne({_id: req.query.orderId})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router
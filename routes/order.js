import { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } from "./verifyToken.js"
import Order from "../models/order.js"

import Router from 'express'
const router = Router()


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

export default router
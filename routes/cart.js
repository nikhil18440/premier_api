// import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken"
import {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization} from './verifyToken.js'
// import Cart from "../models/cart.js"
import Cart from '../models/cart.js'

import Router from 'express'
const router = Router()


//create cart
router.post("/:id", verifyTokenAndAuthorization, async (req,res) => {
    const newCart = new Cart(req.body)

    try {
        
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)

    } catch (error) {
        res.status(400).json(error)
    }
})


//update cart
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {  
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.body._id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(400).json(error)
    }
})


//delete cart
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})


//get user cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req,res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router
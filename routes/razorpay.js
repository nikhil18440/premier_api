// import {NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';
import { Router } from 'express'
const router = Router()


const razorpay = new Razorpay({
    key_id: 'rzp_test_sM994cU3j8AY7A',
    key_secret: 'PpJukXmg78wH3mmq3MV7SXZR'
})

router.post('/', async (req,res) => {
    try {
        const order = await razorpay.orders.create({
            amount: JSON.parse(req.body.total)*100, //amount in paise,
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        })

        res.json({status:200})
    } catch (error) {
        console.log("Error creating order: ", error)
        res.json(
            {error: 'Error creating order'},
            {status: 500}
        )
    }
})

export default router
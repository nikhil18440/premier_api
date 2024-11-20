import User from '../models/user.js'
import { verifyTokenAndAuthorization, verifyToken } from "./verifyToken.js"

import Router from 'express'
const router = Router()


//update user
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
    
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json(error)
    }

})

export default router
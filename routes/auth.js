import { Router } from 'express'
const router = Router()
import User from '../models/user.js'
import pkg from 'crypto-js'
const { AES, enc } = pkg

import pkg2 from 'jsonwebtoken'
const { sign } = pkg2


// SIGN UP
router.post('/register', async (req,res) => {
    const newUser = new User({
        email: req.body.email,
        password: AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        phoneNumber: req.body.phoneNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }

})


// LOGIN
router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        
        !user && res.status(401).json('wrong credentials1')

        if(user){
            const hashedPword = AES.decrypt(user.password, process.env.PASS_SECRET)
            const pword = hashedPword.toString(enc.Utf8)

            pword !== req.body.password && res.status(401).json('wrong credentials2')

            const accessToken = sign({
                id: user._id
            }, process.env.JWT_SEC, {
                expiresIn: "3d"
            })

            const {password, ...others} = user._doc

            console.log('logged in')
            res.status(200).json({...others, accessToken})

        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export default router
const User = require('../models/user.js')
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken.js")

const router = require("express").Router()


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

module.exports = router
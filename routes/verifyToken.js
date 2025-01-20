import pkg from "jsonwebtoken"
const { verify } = pkg
import User from "../models/user.js"
import { default as mongoose } from "mongoose"


const verifyToken = async (req,res,next) => {
    let authHeader
    if(req){
        authHeader = req.headers.token
    }
    if(authHeader){
        const token = authHeader.split(" ")[1]
        verify(token, process.env.JWT_SEC, (err,user) => {
            if (err) {
                res.status(403).json(err)
            }else{
                req.user = user
                next()
            }
        })
    }else{
        return res.status(401).json("you are not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next) => {
    verifyToken(req,res, () => {
        if (req.user.id === req.params.id) {
            next()
        }else{
            res.status(403).json("you are not allowed to perform this action1")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res, async () => {
        if(req.user){
            console.log(req.user)
            var objectId  = mongoose.Types.ObjectId
            var myID = req.user.id
            try {
                const user = await User.findOne({
                    '_id': objectId.createFromHexString(myID)
                })
                
                if (user.isAdmin) {
                    next()
                }else{
                    res.status(403).json(user)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json(error)
            }
        }else{
            res.status(400).json("no user")
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
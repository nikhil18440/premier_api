const jwt = require("jsonwebtoken")


const verifyToken = async (req,res,next) => {
    let authHeader
    if(req){
        authHeader = req.headers.token
    }
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err,user) => {
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
            res.status(403).json("you are not allowed to perform this action")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization }
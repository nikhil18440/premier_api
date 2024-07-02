const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')

const authRoute = require('./routes/auth.js')
const userRoute = require("./routes/users.js")
const cartRoute = require("./routes/cart.js")
const orderRoute = require("./routes/order.js")
const productRoute = require("./routes/product.js")
const payment = require("./routes/paymentRoute.js")

const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to db'))
    .catch((err) => {
        console.log(err)
    })

app.use('/api/auth', authRoute)
app.use("/api/user", userRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api/product", productRoute)


// razor-pay payment
app.get('/', (req, res) => {
    res.send('Razorpay Payment Gateway Using React And Node Js ')
})

app.use('/api/payment', payment);


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})
import express, { json } from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
// const bodyParser = require('body-parser')
import cors from 'cors'

import authRoute from './routes/auth.js'
import userRoute from "./routes/users.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import productRoute from "./routes/product.js"
import reviewRoute from "./routes/review.js"
import paymentRoute from "./routes/razorpay.js"
// const payment = require("./routes/paymentRoute.js")

const app = express()
app.use(json())
config()
app.use(cors({
    origin: true,
    credentials: true
}))

connect(process.env.MONGO_URL)
    .then(() => console.log('connected to db'))
    .catch((err) => {
        console.log(err)
    })

app.use('/api/auth', authRoute)
app.use("/api/user", userRoute)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api/product", productRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/payment", paymentRoute)


// razor-pay payment
app.get('/', (req, res) => {
    res.send('Razorpay Payment Gateway Using React And Node Js ')
})

// app.use('/api/payment', payment);


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
})
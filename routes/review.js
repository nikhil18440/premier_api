import review from "../models/review.js"
import Router from 'express'
const router = Router()

// get all posts
router.get("/",  async (req,res) => {
    try {
        let reviews = await review.find().sort({createdAt: -1})
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json(error)
    }
})

// create a post
router.post("/", async (req,res) => {
    const newReview = new review(req.body)

    try {
        const savedReview = await newReview.save()
        res.status(200).json(savedReview)
        console.log('created a review')
    } catch (error) {
        res.status(400).json(error)
    }
})


export default router
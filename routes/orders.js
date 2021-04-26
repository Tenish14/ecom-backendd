const express = require('express')
const router = express.Router()
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const auth = require("../middleware/auth")

router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user.id
        const cart = await Cart.findOne({userId})

        if(cart) {
            //proceed to checkout
            await Order.create({
                userId,
                items: cart.items,
                total: cart.total,
                image: cart.image
            })

            await Cart.findByIdAndDelete({_id: cart.id})
            return res.send("Checkout Successfully")
        } else {
            return res.status(400).send("Your cart is empty")
        }
    }catch(err) {
        return res.status(400).json(err)
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user.id
        const order = await Order.findOne({userId})
        if(order && order.items.length > 0) {
            return res.json(order)
        } else{
            return res.send("Your cart is empty")
        }
    } catch(e) {
        return res.status(400).json(err)
    }
})


module.exports = router
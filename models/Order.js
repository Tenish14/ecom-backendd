const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {type: String},
    items: [{
        itemId: {type: String},
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity item should be 1 or more"],
            default: 1
        },
        image: {
            type: String,
            required: true
        },
        price: Number
    }],
    total: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Order', OrderSchema)
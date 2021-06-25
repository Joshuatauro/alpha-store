const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    orders: [
      {    
        orderPrice: {
          type: Number,
          required: true
        },
        orderPlacedBy: {
          type: String,
          required: true
        },
        orderDate: {
          type: String,
          required: true
        },
        orderDelivered: {
          type: Boolean,
          required: true
        },
        orderContent: [
          {
            itemTitle: {
              type: String,
              required: true
            },
            itemID: {
              type: String,
              required: true
            },
            itemURL: {
              type: String,
              required: true
            },
            itemPrice: {
              type: Number,
              required: true
            }
          }
        ]
      }
    ],
  }
)


const Order = mongoose.model('order', OrderSchema)
module.exports = Order
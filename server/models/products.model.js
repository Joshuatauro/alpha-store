const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    category: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    price: {
      required: true,
      type: Number
    },
    imgUrl: {
      required: true,
      type: String
    },
    reviews: [
      {
        name: {
          type: String,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        review: {
          type: String,
          required: true
        },
        reviewed_at: {
          type: Date,
          required: true
        }
      }
    ],
    sale: {
      type: Boolean,
      required: true
    },
    salePrice: {
      type: Number,
      required: true
    },
    verifiedSeller: {
      type: Boolean,
      required: true
    }
  }
)

const Product = mongoose.model('product', productSchema)
module.exports = Product
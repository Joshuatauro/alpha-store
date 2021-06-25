const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
    },
    firstName: {
      required: true,
      type: String
    },
    lastName: {
      required: true,
      type:String
    },
    passwordHash: {
      required: true,
      type: String
    },
    addresses: [
      {
        building: {
          type: String,
          required: true
        },
        flat: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        mobile: {
          type: String,
          required: true
        }
      }
    ],
    cart: [
      {
        itemID: {
          type: String,
          required: true
        }
      }
    ],
    wishList: [
      {
        itemID: {
          type: String,
          required: true
        }
      }
    ]
  }
)

const User = mongoose.model('user', userSchema)
module.exports = User
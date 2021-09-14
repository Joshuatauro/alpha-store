const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const db = require('../dbConfig')

router.post('/add-to-cart', async(req, res) => {
  const {name, url, price, sale_price, is_sale, category, id} = req.body.productDetails
  const quantity = req.body.quantity
  const addToCartObject = {
    name, url, price, sale_price, is_sale, category, quantity: parseInt(quantity), id
  }
  
  // const addToCartQuery = await db.query('UPDATE users SET cart = array_append(cart, $1) WHERE id = $2 returning array_length(cart,1 ) AS cart_length', [productDetails, req.userID])
  const addToCartQuery = await db.query('UPDATE users SET cart = array_append(cart, $1) WHERE id = $2 returning array_length(cart,1) AS cart_length, cart', [addToCartObject, req.userID])

  console.log(addToCartQuery.rows[0].cart)
})

router.post('/remove-from-cart', async(req, res) => {
  try{
    const userID = req.userID
    const productDetails = req.body

    if(!userID) return res.status(400).json({message: "Please sign in to your account to remove an item from your cart"})

    const deleteItemFromCartQuery = await db.query('UPDATE users SET cart = arr[0:$1] || cart[$2:] WHERE id = $2 returning cart', [0, userID])
    res.status(200).json({
      updatedCart: deleteItemFromCartQuery.rows
    })

  } catch(err) {
    console.log(err.message)
  }
})

module.exports = router
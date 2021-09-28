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

})

router.post('/remove-from-cart', async(req, res) => {
  try{
    const userID = req.userID
    const indexPosition = parseInt(req.body.indexPosition)

    if(!userID) return res.status(400).json({message: "Please sign in to your account to remove an item from your cart"})

    const deleteItemFromCartQuery = await db.query('UPDATE users SET cart = cart[:$1] || cart[$2:] WHERE id = $3 returning cart', [indexPosition, indexPosition+2,userID])
    
    console.log(deleteItemFromCartQuery.rows)
    
    res.status(200).json({
      updatedCart: deleteItemFromCartQuery.rows[0].cart
    })

  } catch(err) {
    console.log(err)
  }
})

router.post('/submit-order', async(req, res) => {
  const userID = req.userID
  const orderObject = req.body //array
  try{

    if(!userID) return res.status(400).json({message: 'Sign in or create an account to submit your order'})

    const clearCartQuery = await db.query('UPDATE users SET cart = cart[0:0]')
    const submitOrderQuery = await db.query('INSERT INTO orders (user_id, order_content, created_at, is_delivered) VALUES ($1, $2, $3, $4) returning *', [userID, orderObject, new Date(), false])
    res.status(200).json({
      placedOrder: true,
      orderID: submitOrderQuery.rows[0].id
    })
  } catch(err) {
    console.log(err)
  }
})

module.exports = router
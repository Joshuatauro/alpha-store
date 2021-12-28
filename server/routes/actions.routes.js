const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../dbConfig')

router.post('/add-to-cart', async(req, res) => {
  const {name, url, price, sale_price, is_sale, category, id} = req.body.productDetails
  const quantity = req.body.quantity
  const addToCartObject = {
    name, url, price, sale_price, is_sale, category, quantity: parseInt(quantity), id
  }
  const userID = req.userID
  
  try{
    const addToCartQuery = await db.query('UPDATE users SET cart = array_append(cart, $1) WHERE id = $2 returning array_length(cart,1) AS cart_length, cart', [addToCartObject, userID])

    res.status(200).json(
      {
        addedToCart: addToCartQuery.rows.length > 0 ? true : false,
        cartLength: addToCartQuery.rows[0]?.cart_length
      }
    )
  } catch(err) {
    res.status(400).json({
      message: err
    })
  }
})

router.post('/add-to-wishlist', async(req, res) => {
  const {name, url, price, sale_price, is_sale, id} = req.body.productDetails
  const addToWishlistObject = {
    name, url, price, sale_price, is_sale , id
  }
  const userID = req.userID
  try{

    if(!userID) return res.status(400).json({message: "Please sign into your account to add items to the wishlist"})

    const addToWishlistQuery = await db.query('UPDATE users SET wishlist = array_append(wishlist, $1) WHERE id = $2 returning array_length(wishlist,1) AS wishlist_length',[addToWishlistObject, userID])
    res.status(200).json(
      {
        wishlistLength: addToWishlistQuery.rows[0].wishlist_length,
        addedToWishlist: true,
       
      }
    )
    
  } catch(err) {
  }
})

router.post('/remove-from-cart', async(req, res) => {
  try{
    const userID = req.userID
    const indexPosition = parseInt(req.body.indexPosition)

    if(!userID) return res.status(400).json({message: "Please sign in to your account to remove an item from your cart"})

    const deleteItemFromCartQuery = await db.query('UPDATE users SET cart = cart[:$1] || cart[$2:] WHERE id = $3 returning cart', [indexPosition, indexPosition+2,userID])
    
    
    res.status(200).json({
      updatedCart: deleteItemFromCartQuery.rows[0].cart
    })

  } catch(err) {
  }
})

router.post('/remove-from-wishlist', async(req, res) => {
  try{
    const userID = req.userID
    const indexPosition = parseInt(req.body.indexPosition)

    if(!userID) return res.status(400).json({message: "Please sign in to your account to remove an item from your cart"})

    const deleteItemFromWishlistQuery = await db.query('UPDATE users SET wishlist = wishlist[:$1] || wishlist[$2:] WHERE id = $3 returning wishlist', [indexPosition, indexPosition+2,userID])

    res.status(200).json({
      updatedWishlist: deleteItemFromWishlistQuery.rows[0].wishlist
    })

  } catch(err) {
  }
})

router.post('/submit-order', async(req, res) => {
  const userID = req.userID
  const orderObject = req.body.orderObject //array
  const total = req.body.total
  try{

    if(!userID) return res.status(400).json({message: 'Sign in or create an account to submit your order'})

    const clearCartQuery = await db.query('UPDATE users SET cart = cart[0:0] WHERE id = $1', [userID])
    const submitOrderQuery = await db.query('INSERT INTO orders (user_id, order_content, created_at, is_delivered, total) VALUES ($1, $2, $3, $4, $5) returning *', [userID, orderObject, new Date(), true, total])
    res.status(200).json({
      placedOrder: true,
      orderID: submitOrderQuery.rows[0].id
    })
  } catch(err) {
  }
})

router.post('/submit-review', async(req, res) => {
  const {review, rating, title, product_id} =  req.body
  const userName = req.name
  const userID = req.userID

  try{
    const submitUserReviewQuery = await db.query('INSERT INTO reviews (review, rating, title, product_id, name, user_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *',[review, rating, title, product_id, userName, userID, new Date()])
    if(submitUserReviewQuery.rows.length > 0){
      res.status(200).json(
        {
          wasSuccess: true
        }
      )
    }
  } catch(err) {
    res.status(400).json(
      {
        wasSuccess: false
      }
    )
  }
})

module.exports = router
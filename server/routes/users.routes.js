const router = require('express').Router()
const { cloudinary } = require('../cloudinary.config')
const db = require('../dbConfig')

router.get('/cart', async(req, res) => {
  try{
    const userID = req.userID
    if(!userID) return res.status(400).json({message: "Please sign in to view this page"})

    const getCartItemsQuery = await db.query('SELECT cart FROM users WHERE id=$1', [userID])
    res.status(200).json({cart: getCartItemsQuery.rows[0].cart})
  } catch(err) {
  }
})

router.get('/wishlist', async(req,res) => {
  const userID = req.userID

  try{
    if(!userID) return res.status(400).json({message: "Please sign into your account to continue"})

    const getWishlistItemsQuery = await db.query('SELECT wishlist FROM users WHERE id=$1', [userID])

    res.status(200).json({
      wishlist: getWishlistItemsQuery.rows[0].wishlist
    })

  } catch(err) {
    res.status(200).json({
      message: err.message
    })
  }
})

router.get('/orders', async(req, res) => {
  const userID = req.userID

  try{

    const getUserOrders = await db.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userID])

    res.status(200).json({
      orders: getUserOrders.rows,
      wasSuccess: true
    })

  } catch(err) {
    res.status(400).json(
      {
        message: err.message,
        wasSuccess: false
      }
    )
  }
})

router.get('/order/:id', async(req, res) => {
  const orderID = req.params.id
  const userID = req.userID

  try{

    const getOrderDetails = await db.query('SELECT * FROM orders WHERE id=$1 AND user_id=$2', [orderID, userID])

    if(getOrderDetails.rows.length > 0){
      res.status(200).json({
        orderDetails: getOrderDetails.rows[0],
      })
    } else if(getOrderDetails.rows.length === 0) {
      res.status(200).json({
        wasFound: false
      })
    }

  } catch{
  }

})

module.exports = router
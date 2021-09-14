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
    console.log(err.message)
  }
})

module.exports = router
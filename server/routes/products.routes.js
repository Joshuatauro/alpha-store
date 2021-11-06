const router = require('express').Router()
const Product = require('../models/products.model')
const User = require('../models/user.model')
const { cloudinary } = require('../cloudinary.config')
const db = require('../dbConfig')

router.get('/category/:categoryName', async(req, res) => {
  const category = req.params.categoryName
  try{

    const categorySearchQuery = await db.query('SELECT name, url, id, price, sale_price, is_sale, category FROM products WHERE category ILIKE $1', [category])

    res.status(200).json({products: categorySearchQuery.rows})

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

router.get('/:productID', async(req, res) => {
  const productID = req.params.productID

  try {

    const getSingleProductQuery = await db.query('SELECT name, description, url, id, price, sale_price, is_sale, seller_name, category FROM products WHERE id = $1', [productID])
    res.status(200).json({productDetail: getSingleProductQuery.rows[0], message: "Found item details successfully"})

  } catch (err){
    res.status(400).json({message: "Something went wrong while trying to fetch the product, either it dosent exist or we might have slipped up, please be patient"})
  }
})

router.get('/:productID/reviews', async(req, res) => {
  const productID = req.params.productID

  try {

    const getSingleProductReviewsQuery = await db.query('SELECT id, name, title, review, rating, created_at FROM reviews WHERE product_id = $1', [productID])
    res.status(200).json({reviews: getSingleProductReviewsQuery.rows, message: "Found item reviews successfully"})
    
  } catch (err){
    res.status(400).json({message: "Something went wrong while trying to fetch the product, either it dosent exist or we might have slipped up, please be patient"})
  }
})

module.exports = router
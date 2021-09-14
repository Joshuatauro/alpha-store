const router = require('express').Router()
const Product = require('../../models/products.model')
const User = require('../../models/user.model')
const { cloudinary } = require('../../cloudinary.config')
const db = require('../../dbConfig')

router.post('/add', async(req, res) => {
  const isAdmin = req.is_admin
  const id = req.userID

  const { title, desc, base64Image, imgURL, price, onSale, sellerName, salePrice, category } = req.body
  try{

    // if(!isAdmin) return res.status(401).json({message: "This feature is only available to admins"})
  
    // if(!title || !desc || !imgUrl || !price || !sale || !verifiedSeller || !salePrice || !category) return res.status(400).json({message: "Please enter all the fields"})

    let cloudinaryImageURL = imgURL
    if(imgURL){

      const cloudinaryUploadImage = await cloudinary.uploader.upload(
        imgURL,
        {upload_preset: 'alpha-store'}  
        )
        cloudinaryImageURL = cloudinaryUploadImage.secure_url
      }
      
    const addProductQuery = await db.query('INSERT INTO products (name, description, url, price, sale_price, category, is_sale, seller_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [title, desc, cloudinaryImageURL, price, salePrice, category, onSale, sellerName])
    if(!addProductQuery) return res.status(400).json({message: "Could not add the product", isAdded: false })
    
    res.status(200).json({message: "Added the new product", product: addProductQuery.rows, isAdded: true})

  } catch(err) {
    res.status(400).json({message: err, isAdded: false})

  }
})

router.get('/', async(req, res) => {
  try{
    const getAllProductsQuery = await db.query('SELECT name, price, sale_price, is_sale, id, url, category, seller_name FROM products ORDER BY category')

    res.status(200).json(
      {
        products: getAllProductsQuery.rows
      }
    )
  } catch(err){
    res.status(400).json({
      message: err.message
    })
  }
})

router.get('/:productID', async(req, res) => {
  const productID = req.params.productID

  
  try{
    const getSingleProductDetails = await db.query('SELECT * FROM products WHERE id = $1', [productID])
  
    res.status(200).json({
      productDetails: getSingleProductDetails.rows[0],
    })
    
  } catch(err){
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports = router
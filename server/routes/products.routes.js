const router = require('express').Router()
const Product = require('../models/products.model')
const User = require('../models/user.model')
const { cloudinary } = require('../cloudinary.config')

router.post('/admin/add', async(req, res) => {
  const isAdmin = req.is_admin
  const id = req.userID

  const { title, desc, base64Image, price, sale, verifiedSeller, salePrice, category } = req.body
  
  try{

    if(!isAdmin) return res.status(401).json({message: "This feature is only available to admins"})
  
    // if(!title || !desc || !imgUrl || !price || !sale || !verifiedSeller || !salePrice || !category) return res.status(400).json({message: "Please enter all the fields"})

    let imgUrl
    const cloudinaryUploadImage = await cloudinary.uploader.upload(
      base64Image,
      {upload_preset: 'alpha-store'}  
    )
    imgUrl = cloudinaryUploadImage.secure_url

    const productObject = {
      title, desc, imgUrl, price, sale, verifiedSeller, salePrice, category
    }

    const productConstructor =  new Product(productObject)

    const addProduct = await productConstructor.save()


    if(!addProduct) return res.status(400).json({message: "Could not add the product", })

    
    res.status(200).json({message: "Added the new product", product: addProduct})

  } catch(err) {
    // console.log(err)
    res.status(402).json({message: err})
  }
})

router.get('/category/:categoryName', async(req, res) => {
  const category = req.params.categoryName
  try{

    const products = await Product.find({category})
    res.status(200).json({products})

  } catch(err) {
    res.status(400).json({message: err.message})
  }
})

module.exports = router
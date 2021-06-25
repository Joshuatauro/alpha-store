const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//logging user in
router.post('/login', async(req, res) => {

})

//creating account for user
router.post('/signup', async(req, res) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const rePassword = req.body.rePassword
  const shouldRemember = req.body.remember

  try{

    if(!email || !firstName || !lastName || !rePassword) return res.status(401).json({message: "Please enter all the fields"})

    if(password !== rePassword) return res.status(401).json({message: "Make sure both entered passwords are correct"})

    const doesUserExists = await User.findOne({email}) //searches if any email field with user entered email

    if(doesUserExists) return res.status(401).json({message: "Account with given email address already exists"})

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User(
      {
        email, 
        firstName,
        lastName,
        passwordHash
      }
    )

    const addedUser = await newUser.save()

    const authToken = jwt.sign(
      {
        name: firstName+" "+lastName,
        userID: addedUser._id,
        isAdmin: process.env.IS_ADMIN
      }, process.env.JWT_SECRET
    )

    //Sending HTTP cookie which expir
    res.cookie('authToken', authToken, { httpOnly: true }, { expire: shouldRemember ? false : new Date() + 2000000 } ).json({message: "Logged in successfully", logUserIn: true})

  } catch(err) {
    res.status(400).json(
      {
        message: err.message
      }
    )
  }
})

module.exports = router
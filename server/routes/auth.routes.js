const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const db = require('../dbConfig')


//logging user in
router.post('/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password
  const remember = req.body.remember

  try{
    if(!email || !password) return res.status(401).json({message: "Please enter all the fields"})

    const savedUserAccount = await db.query('SELECT email, hashed_password, admin_level FROM users WHERE email = $1', [email])

    if(!(savedUserAccount.rowCount > 0)) return res.status(404).json({message: "Could not find any account with given email address, try creating a new account"})
  
    const doesPasswordMatch = await bcrypt.compare(password, savedUserAccount.rows[0].hashed_password)
    if(!doesPasswordMatch) return res.status(401).json({message: "Email ID or password might be wrong, please make sure entered details are correct"})


    const authToken = jwt.sign(
      {
        userID: savedUserAccount.rows[0].id,
        name: savedUserAccount.rows[0].name,
        adminLevel: savedUserAccount.rows[0].admin_level
      }, process.env.JWT_SECRET
    )

    //Sending HTTP cookie which expires
    res.cookie('authToken', authToken, { httpOnly: true }, { expire: remember ? false : new Date() + 2000000 } ).json({message: "Logged in successfully", logUserIn: true, isAdmin: savedUserAccount.isAdmin, firstName: savedUserAccount.firstName, lastName: savedUserAccount.lastName, wishList: savedUserAccount.wishList, cart: savedUserAccount.cart})

  } catch(err) {
    res.status(400).json(
      {
        message: err.message
      }
    )
  }


})

//creating account for user
router.post('/signup', async(req, res) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const rePassword = req.body.rePassword
  const shouldRemember = req.body.remember
  const date = new Date()

  try{

    if(!email || !firstName || !lastName || !rePassword) return res.status(401).json({message: "Please enter all the fields"})

    if(password !== rePassword) return res.status(402).json({message: "Make sure both entered passwords are correct"})

    const doesUserExists =  await db.query('SELECT email FROM users WHERE email = $1', [email]) //searches if any email field with user entered email

    if((doesUserExists.rowCount = 0)) return res.status(403).json({message: "Account with given email address already exists"})

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    console.log(process.env.ADMIN_LEVEL)
    const addNewUserQuery = await db.query('INSERT INTO users(email, hashed_password, name, admin_level, created_at) VALUES ($1, $2, $3, $4, $5) returning *', [email, passwordHash, firstName+' '+lastName, process.env.ADMIN_LEVEL, date])

    const authToken = jwt.sign(
      {
        name: firstName+" "+lastName,
        userID: addNewUserQuery.rows[0].id,
        adminLevel: addNewUserQuery.rows[0].admin_level
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

// router.get('/auth-status', async(req,res) => {
//   if(req.cookies.authToken) {
//     const userID = req.userID
//     const {isAdmin, cart, wishList} = await User.findById(userID)
//     res.json({isVerified: true ,name: req.name, userID, adminLevel, cart, wishList})
//   }else {
//     res.json({isVerified: false})
//   }

// })

module.exports = router
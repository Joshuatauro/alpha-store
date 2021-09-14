const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true }))

const authMiddleware = async(req, res, next) => {
  const authToken = req.cookies.authToken
  if(!authToken) return next()
  try{
    const {isAdmin, name, userID} = await jwt.verify(authToken, process.env.JWT_SECRET)
    console.log('here motherfucker')
    console.log(userID, 'here')
    req.is_admin = isAdmin
    req.name = name
    req.userID = userID
    return next()
  } catch(err){
    return next()
  }
}

app.use(authMiddleware)

app.get('/', (req, res) => {
  res.send('Hello world')
})

const PORT = process.env.PORT || 5000

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/products', require('./routes/products.routes'))
app.use('/api/actions', require('./routes/actions.routes'))
app.use('/api/users', require('./routes/users.routes'))

app.use('/api/admin/products', require('./routes/Admin/products.routes'))

app.listen(PORT, () => console.log('Server is up and running'))

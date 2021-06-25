const express = require('express')
const cors = require('cors')
const { urlencoded } = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({credentials: true, origin: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

const PORT = process.env.PORT || 5000

app.use('/api/auth', require('./routes/auth.routes'))

app.listen(PORT, () => console.log('Server is up and running'))

mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to mongo db");
  }
)
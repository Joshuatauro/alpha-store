const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../dbConfig')

router.get('/login', async(req, res) => {
  const email = req.body.email
  const password = req.body.password

  try{

    const getUserDetailsQuery = await db.query('SELECT email, password, admin_level FROM users WHERE email = $1', [email])

    console.log(getUserDetailsQuery.rows)


  } catch(err) {

  }
})

modules.exports = router
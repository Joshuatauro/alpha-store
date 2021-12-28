const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../../dbConfig')

router.get('/', async(req, res) => {
  try{
    const getOrdersQuery = await db.query('SELECT id, is_delivered, total, order_content, created_at FROM orders ORDER BY created_at DESC LIMIT 20 ')

    res.status(200).json({
      orders: getOrdersQuery.rows
    })

  } catch(err) {
    console.log(err)
  }
})

router.put('/mark-delivered/:id', async(req, res) => {
  const id = req.params.id
  try{
    console.log(id)
    const updateOrderStatus = await db.query('UPDATE orders SET is_delivered = true WHERE id = $1', [id])

    res.status(200).json({
      wasUpdated: true
    })

  } catch(err){
    console.log(err.message)

  }
})

module.exports = router
const router = require('express').Router()
const db = require('../../dbConfig')

router.get('/', async(req, res) => {

  try{
    const getOrderStatisticsQuery = await db.query('SELECT total, is_delivered FROM orders')

    const reduceFunction = (prevValue, currValue) => prevValue + currValue
    const totalOrderCount = getOrderStatisticsQuery.rowCount
    const totalOrderAmount = getOrderStatisticsQuery.rows.map(row => row.total).reduce(reduceFunction)
    let totalOrdersDelivered = 0
    getOrderStatisticsQuery.rows.map(row => row.is_delivered ? totalOrdersDelivered++ : totalOrdersDelivered = totalOrdersDelivered + 0)


    const getUserStatisticsQuery = await db.query('SELECT COUNT(*) AS user_count FROM users')
    const totalUserCount = getUserStatisticsQuery.rows[0].user_count
    
    res.status(200).json({
      totalOrderCount, totalOrderAmount, totalOrdersDelivered, totalUserCount
    })
  } catch(err) {
    console.log(err)
  }
})

router.get('/sign-ups', async(req, res) => {

  try{
    const getUserSignupsQuery = await db.query('SELECT email, name, created_at FROM users ORDER BY created_at DESC LIMIT 3')

    res.status(200).json({
      userSignups: getUserSignupsQuery.rows
    })
  } catch(err) {
    console.log(err)
  }
})

router.get('/reviews', async(req, res) => {

  try{
    const getReviewsQuery = await db.query('SELECT name, title, review, rating, created_at FROM reviews ORDER BY created_at DESC LIMIT 3')

    res.status(200).json({
      reviews: getReviewsQuery.rows
    })
  } catch(err) {

  }
})

router.get('/orders', async(req, res) => {
  try{
    const getOrdersQuery = await db.query('SELECT id, is_delivered, created_at FROM orders ORDER BY created_at DESC LIMIT 5')

    res.status(200).json({
      orders: getOrdersQuery.rows
    })
  } catch(err) {

  }
})

module.exports = router
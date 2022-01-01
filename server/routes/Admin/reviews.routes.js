const router = require("express").Router()
const db = require("../../dbConfig")

router.get("/:id", async(req, res) => {

  const userID = req.params.id

  try{

    const getAllUsersReviewsQuery = await db.query("SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10", [userID])
    res.status(200).json({
      userReviews: getAllUsersReviewsQuery.rows
    })


  } catch(err) {
    console.log(err.message)
  }
})

module.exports = router
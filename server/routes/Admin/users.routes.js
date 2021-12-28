const router = require('express').Router()
const db = require("../../dbConfig")

router.get("/", async(req, res) => {
  
  try {

    const getAllUsersQuery = await db.query("SELECT id, name, email, admin_level FROM users ORDER BY admin_level ASC")

    res.status(200).json({
      users: getAllUsersQuery.rows
    })

  } catch(err) {
    console.log(err.message)
  }
})

router.put("/make-admin/:userID", async(req, res) => {
  const userID = req.params.userID
  try{

    const makeAdminQuery = await db.query("UPDATE users SET admin_level = 1 WHERE id = $1 returning name, email, id, admin_level", [ userID ])

    res.status(200).json({
      wasUpdated: true,
      user: makeAdminQuery.rows[0]
    })

  } catch(err) {
    console.log(err.message)
  }
})

router.get("/:id/details", async(req, res) => {

  const userID = req.params.id

  try{

    const getUserDetailsQuery = await db.query("SELECT name, email, id, admin_level, created_at FROM users WHERE id = $1", [userID])

    res.status(200).json({
      userDetails: getUserDetailsQuery.rows[0]
    })

  } catch(err) {

  }
})

module.exports = router 
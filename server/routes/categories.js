const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories", (req, res, next) => {
  const sql = `SELECT * FROM categories`

  conn.query(sql, (err, results, fields) => {
    const categories = results
      .filter(cat => cat.parent_id == null)
      .map(main => {
        return {
          ...main,
          sub: results.filter(sub => sub.parent_id == main.id)
        }
      })

    res.json(categories)
  })
})

module.exports = router

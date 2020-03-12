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

router.get("/category/:slug", (req, res, next) => {
  const slug = req.params.slug

  const sql = `
  SELECT p.id, p.name, p.posting, p.time_created
  FROM posts p
  LEFT JOIN categories c ON p.category_id = c.id
  WHERE c.slug = ?
  ORDER BY p.time_created DESC
  LIMIT 50
  `

  conn.query(sql, [slug], (err, res, fields) => {
    res.json(results)
  })
})

module.exports = router

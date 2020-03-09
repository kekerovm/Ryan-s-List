const express = require("express")
const categoryRoutes = require("./routes/categories")

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", categoryRoutes)

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})

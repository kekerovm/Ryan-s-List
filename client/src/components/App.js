import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from "./Home"

export default props => {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  )
}

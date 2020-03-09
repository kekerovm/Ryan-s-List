import React, { useEffect } from "react"
import { useCats } from "../hooks"

export default props => {
  const { categories, get } = useCats()

  useEffect(() => {
    get()
  }, [])

  return (
    <div className="catcontainer">
      {categories.map(cat => (
        <div className="cat">
          <h3>
            <a href="#">{cat.name}</a>
          </h3>
          <div>
            {cat.sub.map(sub => (
              <p>
                <a href="#">{sub.name}</a>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

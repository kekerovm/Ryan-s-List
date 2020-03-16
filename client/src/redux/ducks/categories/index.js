import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET = "cats/GET"
const GET_CURRENT = "cats/GET_CURRENT"

const initialState = {
  categories: [],
  current: "",
  posts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return { ...state, categories: action.payload }
    case GET_CURRENT:
      return {
        ...state,
        current: action.payload.category,
        posts: action.payload.posts
      }
    default:
      return state
  }
}

function getCurrent(slug) {
  return dispatch => {
    axios.get("/api/category" + slug).then(resp => {
      console.log(resp.data)

      dispatch({
        type: GET_CURRENT,
        payload: {
          category: resp.data.catName,
          posts: resp.data.posts
        }
      })
    })
  }
}

function getCategories() {
  return dispatch => {
    axios.get("/api/cats").then(resp => {
      dispatch({
        type: GET,
        payload: resp.data
      })
    })
  }
}

export function useCats() {
  const dispatch = useDispatch()
  const categories = useSelector(appState => appState.catState.categories)
  const get = () => dispatch(getCategories())
  const getPosts = slug => dispatch(getCurrent(slug))
  const currentCategory = useSelector(appState => appState.catState.current)
  const posts = useSelector(appState => appState.catState.posts)

  return { categories, get, getPosts, posts, currentCategory }
}

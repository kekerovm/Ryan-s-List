import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET = "cats/GET"
const GET_CURRENT = "cats/GET_CURRENT"

const initialState = {
  categories: [],
  current: {},
  posts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATS:
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
    axios.get("/api/categories").then(resp => {
      dispatch({
        type: GET_CURRENT,
        payload: resp.data
      })
    })
  }
}

function getCats() {
  return dispatch => {
    axios.get("/api/categories").then(resp => {
      const data = resp.data
      dispatch({
        type: GET_CATS,
        payload: data
      })
    })
  }
}

export function useCats() {
  const dispatch = useDispatch()
  const categories = useSelector(appState => appState.catState.categories)
  const get = () => dispatch(getCats())
  const getPosts = slug => dispatch(getCurrent(slug))

  return { categories, get, getPosts }
}

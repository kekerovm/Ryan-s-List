import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const GET_CATS = "cats/GET_CATS"

const initialState = {
  categories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATS:
      return { ...state, categories: action.payload }
    default:
      return state
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

  return { categories, get }
}

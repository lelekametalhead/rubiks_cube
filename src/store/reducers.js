import {
  TOGGLE_LOADING,
  HANDLE_ERROR,
} from "./constants";

const initState = {
  isLoading: false,
  errors: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {

    case TOGGLE_LOADING: {
      return {...state, isLoading: action.state}
    }

    case HANDLE_ERROR: {
      let errors = state.errors.slice()
      let error = action.error
      if (error?.status < 400) return state
      if (error === null) {
        errors.forEach(item => item.isClosed = true)
        return {...state, errors}
      }
      if (Number.isInteger(error)) {
        errors[error].isClosed = true
        return {...state, errors}
      }
      error.timestamp = new Date(Date.now()).toISOString()
      errors.push(error)
      return {...state, errors}
    }

    default:
      return state
  }
}

export default reducer

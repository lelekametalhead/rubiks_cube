import {
  TOGGLE_LOADING,
  HANDLE_ERROR,
} from "./constants";

export const toggleLoading = (state) => ({
  type: TOGGLE_LOADING, state
})
export const handleError = (error) => ({
  type: HANDLE_ERROR, error
})
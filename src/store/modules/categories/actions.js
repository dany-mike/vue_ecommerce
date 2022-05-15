import axios from 'axios'
import * as types from './types'

// CHANGE SET CATEGORIES TO SET CATEGORY if it works
export default {
  [types.FETCH_CATEGORIES]({ commit }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/category`)
      .then((response) => {
        commit(types.SET_CATEGORIES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_CATEGORY]({ commit }, id) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`)
      .then((response) => {
        commit(types.SET_CATEGORIES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CREATE_CATEGORY]({ commit }, formData) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/category`, { formData })
      .then((response) => {
        commit(types.SET_CATEGORIES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.UPDATE_CATEGORY]({ commit }, id) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`)
      .then((response) => {
        commit(types.SET_CATEGORIES, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_CATEGORY]({ commit }, id) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`)
      .then((response) => {
        commit(types.SET_CATEGORIES, response.data)
      })
      .catch((err) => console.log(err))
  },
}

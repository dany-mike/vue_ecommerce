import { authHeader } from '@/helpers/authHeader'
import axios from 'axios'
import * as types from './types'

export default {
  [types.FETCH_CATEGORIES]({ commit }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/category`)
      .then((response) => {
        commit(types.SET_CATEGORY_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_CATEGORY]({ commit }, id) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`)
      .then((response) => {
        commit(types.GET_CATEGORY_ITEM, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CREATE_CATEGORY]({ commit }, formData) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/category`, formData, {
        headers: authHeader(),
      })

      .then((response) => {
        commit(types.SET_CATEGORY_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.UPDATE_CATEGORY]({ commit }, { id, formData }) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`, formData, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_CATEGORY_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_CATEGORY]({ commit }, id) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/category/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_CATEGORY_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
}

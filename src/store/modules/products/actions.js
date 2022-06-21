import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.FETCH_PRODUCTS]({ commit }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/products`)
      .then((response) => {
        commit(types.SET_PRODUCT_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_PRODUCT]({ commit }, id) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/products/${id}`)
      .then((response) => {
        commit(types.SET_PRODUCT, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_PRODUCTS_BY_CATEGORY]({ commit }, category) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/products/c/${category}`)
      .then((response) => {
        commit(types.GET_PRODUCTS_BY_CATEGORY, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CREATE_PRODUCT]({ commit }, formData) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/products`, formData, {
        headers: authHeader(),
      })

      .then((response) => {
        commit(types.SET_PRODUCT_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.UPDATE_PRODUCT]({ commit }, { id, formData }) {
    return axios
      .put(`${process.env.VUE_APP_API_BASE_URL}/products/${id}`, formData, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_PRODUCT_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_PRODUCT]({ commit }, id) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/products/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_PRODUCT_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CLEAR_PRODUCT]({ commit }) {
    commit(types.SET_CLEAR_PRODUCT)
  },
}

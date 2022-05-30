import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.ADD_PRODUCT_TO_WISHLIST]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/wishlist`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_WISHLIST_PRODUCT_PAYLOAD, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_WISHLIST_PRODUCTS]({ commit }, userId) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}`)
      .then((response) => {
        commit(types.SET_WISHLIST_PRODUCTS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.DELETE_WISHLIST_PRODUCT]({ commit }, { userId, productId }) {
    return axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}/${productId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_WISHLIST_PRODUCTS_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
}

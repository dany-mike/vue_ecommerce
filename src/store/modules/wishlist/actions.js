import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.ADD_PRODUCT_TO_WISHLIST]({ commit }, { body, userId }) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_WISHLIST_PRODUCT_PAYLOAD, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_WISHLIST_PRODUCTS]({ commit }, userId) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}`, {
        headers: authHeader(),
      })
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
      .then((r) => {
        commit(types.SET_DELETE_WISHLIST_PRODUCT, r.data)
      })
      .catch((err) => console.log(err))
  },
  [types.HANDLE_WISHLIST_ICON]({ commit }, { userWishlist, item }) {
    let isIconEmpty = true
    userWishlist.forEach((element) => {
      if (element.id === item.id) {
        isIconEmpty = false
      }
    })

    isIconEmpty
      ? commit(types.SET_HANDLE_WISHLIST_ICON, true)
      : commit(types.SET_HANDLE_WISHLIST_ICON, false)
  },
  [types.AFTER_DELETE_WISHLIST_PRODUCT]({ commit }, { products, product }) {
    const updatedProductsList = products.filter((p) => p.id !== product.id)
    commit(types.SET_AFTER_DELETE_WISHLIST_PRODUCT, updatedProductsList)
  },
}

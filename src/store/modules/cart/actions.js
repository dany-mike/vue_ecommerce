import * as types from './types'

export default {
  //   [types.ADD_TO_CART]({ commit }, body) {
  //   },
  [types.GET_CART]({ commit }) {
    const products = localStorage.getItem('products')
    commit(types.SET_CART, products)
  },
  //   [types.DELETE_CART_ITEM]({ commit }) {

  //   },

  //   [types.UPDATE_QUANTITY_ITEM]({ commit }) {

  //   },
  //   TODO: add delete image from my backoffice
  //   [types.DELETE_IMAGE]({ commit }, { userId, productId }) {
  //     console.log(commit)
  //     return axios
  //       .delete(`${process.env.VUE_APP_API_BASE_URL}/wishlist/${userId}/${productId}`, {
  //         headers: authHeader(),
  //       })
  //       .catch((err) => console.log(err))
  //   },
}

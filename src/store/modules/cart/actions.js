import * as types from './types'

export default {
  [types.GET_CART]({ commit }) {
    if (localStorage.getItem('products')) {
      const products = JSON.parse(localStorage.getItem('products'))
      console.log(products)
      commit(types.SET_CART, products)
    }
  },
}

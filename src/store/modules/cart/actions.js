import * as types from './types'

export default {
  [types.GET_CART]({ commit }) {
    if (localStorage.getItem('products')) {
      const products = JSON.parse(localStorage.getItem('products'))
      commit(types.SET_CART, products)
    }
  },
  [types.CLEAR_CART]({ commit }) {
    localStorage.removeItem('products')
    commit(types.SET_CLEAR_CART)
  },
}

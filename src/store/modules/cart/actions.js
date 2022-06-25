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
  [types.GET_CART_AFTER_DELETE]({ commit }, { item, cart }) {
    const updatedCart = cart.filter((p) => p.id !== item.id)

    let totalPrice = 0
    updatedCart.forEach((item) => {
      totalPrice += item.price * item.quantity
    })

    commit(types.SET_GET_CART_AFTER_DELETE, { updatedCart, totalPrice })
  },
}

import * as types from './types'
import actions from './actions'

export const state = {
  cart: [],
}

export const mutations = {
  [types.SET_CART](state, cart) {
    state.cart = cart
  },
  [types.SET_CLEAR_CART](state) {
    state.cart = null
  },
  [types.SET_GET_CART_AFTER_DELETE](state, updatedCart) {
    state.cart = updatedCart
  }
}

const getters = {
  getCart: (state) => state.cart,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

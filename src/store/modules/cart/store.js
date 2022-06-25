import * as types from './types'
import actions from './actions'
import * as states from '../order/store'

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
  [types.SET_GET_CART_AFTER_DELETE](state, item) {
    state.cart = item.updatedCart
    states.state.orderTotal = item.totalPrice
  },
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

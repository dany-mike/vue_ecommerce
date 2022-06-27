import * as types from './types'
import actions from './actions'
import * as states from '../order/store'

export const state = {
  cart: [],
  cartItemCount: 0,
}

export const mutations = {
  [types.SET_CART](state, cart) {
    state.cart = cart
  },
  [types.SET_CLEAR_CART](state) {
    state.cart = []
  },
  [types.SET_GET_CART_AFTER_DELETE](state, item) {
    state.cart = item.updatedCart
    states.state.orderTotal = item.totalPrice
  },
  [types.SET_CART_ITEM_COUNT](state, cartItemCount) {
    state.cartItemCount = cartItemCount
  },
}

const getters = {
  getCart: (state) => state.cart,
  getCartItemCount: (state) => state.cartItemCount,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

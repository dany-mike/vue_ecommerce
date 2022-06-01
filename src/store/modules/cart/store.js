import * as types from './types'
import actions from './actions'

export const state = {
  cart: [],
}

export const mutations = {
  [types.SET_CART](state, cart) {
    state.cart = cart
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

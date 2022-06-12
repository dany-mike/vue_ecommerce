import * as types from './types'
import actions from './actions'

export const state = {
  orderResponse: {},
  userOrders: [],
}

export const mutations = {
  [types.SET_ORDER_RESPONSE](state, orderResponse) {
    state.orderResponse = orderResponse
  },
  [types.SET_USER_ORDERS](state, userOrders) {
    state.userOrders = userOrders
  },
}

const getters = {
  getOrderResponse: (state) => state.orderResponse,
  getUserOrders: (state) => state.userOrders,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

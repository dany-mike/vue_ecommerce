import * as types from './types'
import actions from './actions'

export const state = {
  orderResponse: {},
  userOrders: [],
  orderCompleted: {},
}

export const mutations = {
  [types.SET_ORDER_RESPONSE](state, orderResponse) {
    state.orderResponse = orderResponse
  },
  [types.SET_USER_ORDERS](state, userOrders) {
    state.userOrders = userOrders
  },
  [types.SET_CLEAR_ORDER_DETAILS](state) {
    state.orderResponse = {}
  },
  [types.SET_ORDER_COMPLETED](state, orderCompleted) {
    state.orderCompleted = orderCompleted
  },
}

const getters = {
  getOrderResponse: (state) => state.orderResponse,
  getUserOrders: (state) => state.userOrders,
  getOrderCompleted: (state) => state.orderCompleted,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

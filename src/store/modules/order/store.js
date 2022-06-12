import * as types from './types'
import actions from './actions'

export const state = {
  orderResponse: {},
}

export const mutations = {
  [types.SET_ORDER_RESPONSE](state, orderResponse) {
    state.orderResponse = orderResponse
  },
}

const getters = {
  getOrderResponse: (state) => state.orderResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

import * as types from './types'
import actions from './actions'

export const state = {
  paymentIntent: {},
}

export const mutations = {
  [types.SET_PAYMENT_INTENT](state, paymentIntent) {
    state.paymentIntent = paymentIntent
  },
}

const getters = {
  getPaymentIntent: (state) => state.paymentIntent,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

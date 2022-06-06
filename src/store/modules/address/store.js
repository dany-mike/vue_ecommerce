import * as types from './types'
import actions from './actions'

export const state = {
  addressResponse: null,
  userBillingAddresses: [],
  userShippingAddresses: [],
}

export const mutations = {
  [types.SET_ADDRESS_RESPONSE](state, addressResponse) {
    state.addressResponse = addressResponse
  },
  [types.SET_USER_BILLING_ADDRESSES](state, billingAddresses) {
    state.userBillingAddresses = billingAddresses
  },
  [types.SET_USER_SHIPPING_ADDRESSES](state, shippingAddresses) {
    state.userShippingAddresses = shippingAddresses
  },
}

const getters = {
  getAddressResponse: (state) => state.addressResponse,
  getBillingAddresses: (state) => state.userBillingAddresses,
  getShippingAddresses: (state) => state.userShippingAddresses,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

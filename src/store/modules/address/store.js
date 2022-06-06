import * as types from './types'
import actions from './actions'

export const state = {
  addressResponse: null,
  addressItem: {},
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
  [types.SET_ADDRESS_ITEM](state, addressItem) {
    state.addressItem = addressItem
  },
}

const getters = {
  getAddressResponse: (state) => state.addressResponse,
  getBillingAddresses: (state) => state.userBillingAddresses,
  getShippingAddresses: (state) => state.userShippingAddresses,
  getAddressItem: (state) => state.addressItem,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

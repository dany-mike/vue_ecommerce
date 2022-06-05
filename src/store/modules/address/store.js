import * as types from './types'
import actions from './actions'

export const state = {
  addressResponse: null,
}

export const mutations = {
  [types.SET_ADDRESS_RESPONSE](state, addressResponse) {
    state.addressResponse = addressResponse
  },
}

const getters = {
  getAddress: (state) => state.addressResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

import * as types from './types'
import actions from './actions'

export const state = {
  currentUser: null,
  payloadResponse: null,
}

export const mutations = {
  [types.SET_TOKEN](state, authResponse) {
    if (authResponse.accessToken) {
      localStorage.setItem('user', JSON.stringify(authResponse))
    }
  },
  [types.SET_CURRENT_USER](state, user) {
    if (user && user.accessToken) {
      state.currentUser = user
    }
  },
  [types.SET_PAYLOAD_RESPONSE](state, payloadResponse) {
    state.payloadResponse = payloadResponse
  },
}

const getters = {
  getCurrentUser: (state) => state.currentUser,
  getPayloadResponse: (state) => state.payloadResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

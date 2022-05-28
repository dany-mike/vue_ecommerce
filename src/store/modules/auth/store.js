import * as types from './types'
import actions from './actions'

export const state = {
  authResponse: [],
}

export const mutations = {
  [types.SET_TOKEN](state, authResponse) {
    if (authResponse.accessToken) {
      localStorage.setItem('user', JSON.stringify(authResponse))
    }
    state.authResponse = authResponse
  },
}

export default {
  state,
  actions,
  mutations,
}

import * as types from './types'
import actions from './actions'

export const state = {
  currentUser: [],
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
}

const getters = {
  getCurrentUser: (state) => state.currentUser,
}

export default {
  state,
  actions,
  mutations,
  getters,
}

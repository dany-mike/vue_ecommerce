import * as types from './types'
import actions from './actions'

export const state = {
  currentUser: null,
  errorResponse: null,
  dbUser: null,
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
  [types.SET_ERROR_RESPONSE](state, errorResponse) {
    state.errorResponse = errorResponse
  },
  [types.SET_DB_USER](state, dbUser) {
    state.dbUser = dbUser
  },
}

const getters = {
  getCurrentUser: (state) => state.currentUser,
  getErrorResponse: (state) => state.errorResponse,
  getDbUser: (state) => state.dbUser,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
